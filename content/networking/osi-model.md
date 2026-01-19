# OSI Model

The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct abstraction layers.

## The 7 Layers Deep Dive

### 7. Application Layer
*   **Purpose:** Provides network services directly to end-user applications. It is the layer the user interacts with.
*   **Protocols:** HTTP, HTTPS, FTP, SMTP, DNS, SSH.
*   **Data Unit:** Data.

### 6. Presentation Layer
*   **Purpose:** Ensures that data is in a usable format and is where data encryption, decryption, and compression occur. It acts as the "translator" for the network.
*   **Examples:** SSL/TLS, JPEG, GIF, MPEG, ASCII.
*   **Data Unit:** Data.

### 5. Session Layer
*   **Purpose:** Maintains connections and is responsible for controlling ports and sessions (establishment, management, and termination).
*   **Protocols:** NetBIOS, RPC, PPTP.
*   **Data Unit:** Data.

### 4. Transport Layer
*   **Purpose:** Handles end-to-end communication, flow control, and error correction. It decides how much data to send, at what rate, and where it goes.
*   **Protocols:** TCP (Transmission Control Protocol), UDP (User Datagram Protocol).
*   **Data Unit:** **Segments** (TCP) or **Datagrams** (UDP).

### 3. Network Layer
*   **Purpose:** Responsible for packet forwarding, including routing through intermediate routers. It handles logical addressing (IP addresses).
*   **Protocols:** IP (IPv4, IPv6), ICMP, IGMP, IPsec.
*   **Data Unit:** **Packets**.

### 2. Data Link Layer
*   **Purpose:** Provides node-to-node data transfer. It is divided into two sublayers: Media Access Control (MAC) and Logical Link Control (LLC). It handles physical addressing (MAC addresses).
*   **Examples:** Ethernet, Switch, Bridge, PPP.
*   **Data Unit:** **Frames**.

### 1. Physical Layer
*   **Purpose:** The lowest layer, representing the physical hardware that transmits raw bitstreams over a physical medium (cables, radio waves, etc.).
*   **Examples:** Ethernet cables, Hubs, Repeaters, Fiber Optics.
*   **Data Unit:** **Bits**.

---

## Data Encapsulation and Decapsulation

When data is sent from one device to another, it travels down the OSI stack on the sender's side and up the stack on the receiver's side.

1.  **Encapsulation (Sender):** As data moves from Layer 7 down to Layer 1, each layer adds its own header (and sometimes a trailer) to the data received from the layer above. For example, the Transport layer adds a TCP header to the data, creating a *segment*.
2.  **Decapsulation (Receiver):** As the physical bits are received and move up from Layer 1 to Layer 7, each layer strips off the header intended for it and passes the remaining data to the layer above.

## Why the OSI Model Matters in System Design
*   **Interoperability:** Allows different vendors' hardware and software to communicate.
*   **Troubleshooting:** Helps engineers isolate where a problem is occurring (e.g., a "Layer 1 issue" means a physical cable or hardware failure).
*   **Abstraction:** Developers can focus on the Application layer without worrying about how bits are physically moving across a wire.

---

## OSI Model vs. TCP/IP Model

The TCP/IP model is a more concise version of the OSI model and is the protocol suite upon which the internet and most commercial networks run. While the OSI model is a theoretical framework for understanding communication, TCP/IP is the practical implementation.

### Key Differences

*   **Layers:** OSI has 7 layers, while TCP/IP has 4 layers.
*   **Approach:** OSI is a theoretical model (reference model); TCP/IP is a practical model (protocol model).
*   **Protocol Support:** OSI supports connectionless and connection-oriented communication in the network layer, but only connection-oriented in the transport layer. TCP/IP supports connectionless (IP) in the network layer, and both (TCP/UDP) in the transport layer.

### Comparison Chart

| OSI Layer | TCP/IP Layer | Protocols |
| :--- | :--- | :--- |
| 7. Application | **Application** | HTTP, FTP, SMTP, DNS |
| 6. Presentation | **Application** | SSL/TLS, JPEG |
| 5. Session | **Application** | NetBIOS, RPC |
| 4. Transport | **Transport** | TCP, UDP |
| 3. Network | **Internet** | IP, ICMP, ARP |
| 2. Data Link | **Network Access** (Link Layer) | Ethernet, Wi-Fi |
| 1. Physical | **Network Access** (Link Layer) | Cables, Hubs |

### Layer Mapping

The TCP/IP model combines the top three layers of the OSI model (Application, Presentation, Session) into a single **Application Layer**, and the bottom two layers (Data Link, Physical) into a single **Network Access Layer** (or Link Layer).