using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Helpers;
using Application.Interfaces;
using Application.Models.Order;
using AutoMapper;
using Core.Entities;
using Core.Repositories;

namespace Application.Services
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _mapper = mapper;

        }
        public async Task<List<OrderModel>> GetOrdersAsync()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            return _mapper.Map<List<Order>, List<OrderModel>>(orders);
        }

        public async Task<OrderModel> GetOrderById(string orderId)
        {
            var order = await CheckOrderExisting(orderId);
            return _mapper.Map<Order, OrderModel>(order);
        }

        public async Task<OrderModel> AddOrderAsync(OrderModel orderModel)
        {
            var orderToAdd = _mapper.Map<OrderModel, Order>(orderModel);
            
            var preparedOrderData = await PreparingOrderAsync(orderToAdd);
            
            orderToAdd.TotalCost = preparedOrderData.OrderTotalCost;
            var addedOrder = await _orderRepository.AddOrderAsync(orderToAdd);
            await _productRepository.UpdateProductsAsync(preparedOrderData.ProductsWithUpdatedQuantity);
            var result = await _orderRepository.GetOrderByIdAsync(addedOrder.Id);

            return _mapper.Map<Order, OrderModel>(result);
        }

        public async Task<OrderModel> UpdateOrderAsync(OrderModel orderModel)
        {
            var oldOrder = await _orderRepository.GetOrderByIdAsNoTrackingAsync(orderModel.Id);

            if (oldOrder is null)
            {
                throw new ApplicationException($"Order with Id {orderModel.Id} is not exist");
            }

            var orderToUpdate = _mapper.Map<OrderModel, Order>(orderModel);
            
            var preparedOrderData = await PreparingOrderAsync(oldOrder, orderToUpdate: orderToUpdate);
            orderToUpdate.TotalCost = preparedOrderData.OrderTotalCost;
            var updatedOrder = await _orderRepository.UpdateOrderAsync(orderToUpdate);
            await _productRepository.UpdateProductsAsync(preparedOrderData.ProductsWithUpdatedQuantity);

            var result = await _orderRepository.GetOrderByIdAsync(updatedOrder.Id);

            return _mapper.Map<Order, OrderModel>(result);
        }

        public async Task RemoveOrderAsync(string orderId)
        {
            var order = await CheckOrderExisting(orderId);
            await _orderRepository.RemoveOrderAsync(order);
        }

        private async Task<PreparedOrderData> PreparingOrderAsync(Order thisOrder, Order orderToUpdate = null)
        {
            var productsAsNoTracking = await _productRepository.GetProductsAsNoTracking();

            decimal orderTotalCost = 0;
            List<Product> productsInOrder = null;
            List<Product> productsToUpdateQuantity = null;
            
            if (orderToUpdate == null)
            {
                productsInOrder = productsAsNoTracking
                    .Where(x => thisOrder.OrderItems.Select(p => p.ProductId).Contains(x.Id)).ToList();

                orderTotalCost = OrderHelper.GetOrderTotalCost(thisOrder.OrderItems, productsInOrder);
                productsToUpdateQuantity =
                    ProductHelper.SetNewProductQuantities(productsInOrder, thisOrder.OrderItems);

                return new PreparedOrderData(productsToUpdateQuantity, orderTotalCost);
            }
            
            productsInOrder = productsAsNoTracking
                .Where(x => orderToUpdate.OrderItems.Select(p => p.ProductId).Contains(x.Id)).ToList();
            orderTotalCost = OrderHelper.GetOrderTotalCost(orderToUpdate.OrderItems, productsInOrder);

            productsToUpdateQuantity =
                ProductHelper.SetNewProductQuantities(productsInOrder, thisOrder.OrderItems, orderToUpdate.OrderItems);
            // var newProducts = OrderHelper.ReworkOrderItems(orderToUpdate.OrderItems);
            // var oldProducts = OrderHelper.ReworkOrderItems(thisOrder.OrderItems);
            // newProducts = newProducts.Except(oldProducts).ToList();
            // var newProductsInOrder = productsInOrder.Where(x => newProducts.Select(o => o.ProductId).Contains(x.Id)).ToList();
            //
            // productsToUpdateQuantity = ProductHelper.SetNewProductQuantities(newProductsInOrder, orderToUpdate.OrderItems);

            return new PreparedOrderData(productsToUpdateQuantity, orderTotalCost);
        }
        
        private async Task<Order> CheckOrderExisting(string orderId)
        {
            if (string.IsNullOrEmpty(orderId))
                throw new ApplicationException("Order Id is wrong");

            var result = await _orderRepository.IsOrderExistAsync(orderId);

            if (!result)
                throw new ApplicationException($"Order with Id : {orderId} is not exist");

            return await _orderRepository.GetOrderByIdAsync(orderId);
        }
    }
}
