# 7. System Design Scenarios

Applying indexing knowledge to real-world interview questions.

## Scenario 1: Design a URL Shortener (TinyURL)
*   **Access Pattern:** Heavy Reads (Redirects), Heavy Writes (New Links).
*   **Key:** `short_alias` (e.g., `abc12`).
*   **Requirement:** Look up long URL by `short_alias` instantly.
*   **Choice:**
    *   **Hash Index:** Perfect for $O(1)$ lookups. No range queries needed (you never ask "give me links between `abc` and `abd`").
    *   **Database:** Redis (KV Store) or DynamoDB.

## Scenario 2: Design "Nearby Friends" (Facebook/Uber)
*   **Access Pattern:** Frequent location updates (Write heavy), Frequent "Who is near me?" (Read heavy spatial).
*   **Requirement:** Find points within radius $R$.
*   **Choice:**
    *   **Standard B-Tree:** Fails.
    *   **Geospatial Index:** **Geohash** (string) with a B-Tree or **Quad-Tree** (in memory).
    *   **Database:** Redis (Geo commands - uses Geohash) or Postgres (PostGIS - uses R-Trees).

## Scenario 3: Design a Log Analysis System (Splunk/Datadog)
*   **Access Pattern:** Massive Write throughput (millions of logs/sec). Rare Reads (Analytics queries).
*   **Requirement:** "Count errors in the last hour".
*   **Choice:**
    *   **B-Tree:** Fails (Writes are too slow due to random I/O).
    *   **LSM Tree:** Excellent. Appends logs sequentially.
    *   **Bitmap Index:** Great for filtering by `Level=ERROR`, `Region=US-EAST`.
    *   **Database:** Cassandra, Elasticsearch (Inverted Index for text search), or ClickHouse (Columnar).

## Scenario 4: E-Commerce Product Catalog (Amazon)
*   **Access Pattern:** Heavy Reads (Search, Filtering). Low Writes (Price updates).
*   **Requirement:** Filter by Category, Price Range, Brand, Rating *simultaneously*.
*   **Choice:**
    *   **Inverted Index:** Essential for text search ("Running Shoes").
    *   **B-Tree:** Good for Price range.
    *   **Composite Index:** `(Category, Rating)` for common sorts.
    *   **Database:** Elasticsearch (primary for search) + RDBMS (primary for inventory consistency).
