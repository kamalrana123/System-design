
# TCP vs. UDP

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two of the most common protocols used for data transmission over the internet.

## TCP (Transmission Control Protocol)

-   **Reliable:** Guarantees that data will be delivered in the order it was sent and without errors.
-   **Connection-Oriented:** Establishes a connection before data is sent, ensuring a reliable link.
-   **Slower:** The overhead of ensuring reliability makes it slower than UDP.
-   **Use Cases:** Ideal for applications that require high reliability, such as file transfers, email, and web browsing.

## UDP (User Datagram Protocol)

-   **Unreliable:** Does not guarantee delivery or order of data packets.
-   **Connectionless:** Sends data without establishing a connection first.
-   **Faster:** Less overhead makes it faster than TCP.
-   **Use Cases:** Suitable for applications where speed is more critical than reliability, such as video streaming, online gaming, and DNS lookups.
