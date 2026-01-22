# Caching Algorithms (Eviction Policies)

When the cache is full, we need to decide which item to remove (evict) to make room for new data. This is decided by the eviction policy or algorithm.

## Common Algorithms

### 1. LRU (Least Recently Used)
*   **Concept**: Evicts the item that hasn't been used for the longest time.
*   **Use Case**: The most popular policy. Works well for "locality of reference" where recently accessed items are likely to be accessed again.
*   **Implementation**: Often implemented using a Doubly Linked List and a Hash Map.

### 2. LFU (Least Frequently Used)
*   **Concept**: Evicts the item that has been used the fewest number of times.
*   **Use Case**: Good when access patterns are stable, but can be problematic for items that were popular briefly and then never accessed again (they stay in cache due to high count).

### 3. FIFO (First In First Out)
*   **Concept**: Evicts the oldest item added to the cache, regardless of how recently or frequently it was accessed.
*   **Use Case**: Simple to implement but generally performs poorly compared to LRU.

### 4. LIFO (Last In First Out)
*   **Concept**: Evicts the most recently added item.
*   **Use Case**: Rare. Useful if the older data is more valuable or if new data is only relevant for a split second.

### 5. MRU (Most Recently Used)
*   **Concept**: Evicts the item that was most recently accessed.
*   **Use Case**: Useful in cyclic access patterns (e.g., scanning a large file) where the most recently accessed item is the *least* likely to be needed again soon.

### 6. Random Replacement (RR)
*   **Concept**: Randomly selects an item to evict.
*   **Use Case**: Surprisingly effective in some scenarios and very simple/fast to implement (no need to track usage history).

## Advanced Algorithms

### ARC (Adaptive Replacement Cache)
*   Sophisticated algorithm that dynamically balances between LRU and LFU to improve hit rates.
*   Used in some modern databases and storage systems (e.g., ZFS).

### 2Q (Two Queues)
*   Uses multiple queues to separate "frequently used" from "recently used" items, mitigating some downsides of pure LRU.
