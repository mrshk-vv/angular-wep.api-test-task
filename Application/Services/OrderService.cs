using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            if (string.IsNullOrEmpty(orderId))
            {
                throw new ApplicationException($"Order Id is wrong");
            }

            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order is null)
            {
                throw new ApplicationException($"Order with Id : {orderId} is not exist");
            }

            return _mapper.Map<Order, OrderModel>(order);
        }

        public async Task<OrderModel> AddOrderAsync(OrderModel orderModel)
        {
            var orderToAdd = _mapper.Map<OrderModel, Order>(orderModel);

            var productsAsNoTracking = await _productRepository.GetProductsAsNoTracking();

            var productsInOrder =
                productsAsNoTracking.Where(x => orderModel.OrderItems.Select(p => p.ProductId).Contains(x.Id)).ToList();

            orderToAdd.TotalCost = OrderHelper.GetOrderTotalCost(orderModel.OrderItems, productsInOrder);

            var addedOrder = await _orderRepository.AddOrderAsync(orderToAdd);

            var productsToUpdateQuantity =
                ProductHelper.SetNewProductQuantities(productsInOrder, orderModel.OrderItems);

            await _productRepository.UpdateProductsAsync(productsToUpdateQuantity);

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

            var productsAsNoTracking = await _productRepository.GetProductsAsNoTracking();

            var productsInOrder =
                productsAsNoTracking.Where(x => orderToUpdate.OrderItems.Select(p => p.ProductId).Contains(x.Id)).ToList();

            var newProducts = OrderHelper.ReworkOrderItems(orderToUpdate.OrderItems);
            var oldProducts = OrderHelper.ReworkOrderItems(oldOrder.OrderItems);

            newProducts = newProducts.Except(oldProducts).ToList();

            var newProductsInOrder = productsInOrder.Where(x => newProducts.Select(o => o.ProductId).Contains(x.Id)).ToList();

            orderToUpdate.TotalCost = OrderHelper.GetOrderTotalCost(orderModel.OrderItems, productsInOrder);
            
            var updatedOrder = await _orderRepository.UpdateOrderAsync(oldOrder, orderToUpdate);
            
            var productsToUpdateQuantity = ProductHelper.SetNewProductQuantities(newProductsInOrder, orderModel.OrderItems);
            
            await _productRepository.UpdateProductsAsync(productsToUpdateQuantity);

            var result = await _orderRepository.GetOrderByIdAsync(updatedOrder.Id);

            return _mapper.Map<Order, OrderModel>(result);


        }

        public async Task RemoveOrderAsync(string orderId)
        {
            if (string.IsNullOrEmpty(orderId))
            {
                throw new ApplicationException("Order Id is null");
            }

            var product = await _orderRepository.GetOrderByIdAsync(orderId);

            if (product is null)
            {
                throw new ApplicationException($"Order with Id : {orderId} is not exist");
            }

            await _orderRepository.RemoveOrderAsync(product);
        }
    }
}
