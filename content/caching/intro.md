# Introduction to Caching

Caching is a technique used to store copies of frequently accessed data in a temporary storage location (cache) so that future requests for that data can be served faster. The primary goal of caching is to increase data retrieval performance by reducing the need to access the underlying slower storage layer.

## Why Use Caching?

1.  **Reduce Latency**: Accessing data from memory (RAM) is orders of magnitude faster than accessing it from a hard drive or fetching it over a network.
2.  **Increase Throughput**: Caches can serve more requests per second (RPS) than traditional databases, helping systems scale.
3.  **Reduce Load**: By serving read traffic from the cache, you reduce the load on your backend databases and services, preventing bottlenecks.

## Core Concepts

### Locality of Reference
Caching relies on the principle of locality of reference:
*   **Temporal Locality**: Data that has been accessed recently is likely to be accessed again in the near future.
*   **Spatial Locality**: Data that is stored near recently accessed data is likely to be accessed soon.

### Cache Hit vs. Cache Miss
*   **Cache Hit**: When the requested data is found in the cache.
*   **Cache Miss**: When the requested data is not found in the cache, requiring a fetch from the primary source (e.g., database).

## Cost of Caching
While beneficial, caching introduces complexity:
*   **Data Consistency**: Keeping the cache in sync with the source of truth (database) is one of the hardest problems in distributed systems.
*   **Maintenance**: Requires managing additional infrastructure (e.g., Redis clusters).
