
# Proxies: Forward vs. Reverse

In computer networking, a proxy server acts as an intermediary between a client and a server. There are two primary types: **Forward Proxies** and **Reverse Proxies**.

---

## 1. Forward Proxy
A **Forward Proxy** (often just called a "proxy") sits in front of a group of **clients**. When those clients send requests to resources on the internet, the forward proxy intercepts those requests.

### How it works:
1. Client sends a request to the internet.
2. The Forward Proxy receives the request.
3. The Proxy evaluates the request, perhaps applies rules (filtering), and then sends it to the destination server on behalf of the client.
4. The server sees the Proxy's IP, not the Client's.

### Why use it?
*   **Anonymity:** Hides the client's IP address from the destination server.
*   **Bypassing Restrictions:** Allows users to access content blocked by their ISP or government (e.g., using a proxy in another country).
*   **Content Filtering:** Organizations (like schools or offices) use it to block access to specific websites (e.g., social media).

### Real-World Example:
**The Corporate Firewall.** Imagine you work at a large bank. When you try to visit `facebook.com`, your request goes to the company's forward proxy first. The proxy checks if `facebook.com` is on the "blocked list." If it is, you get a "Forbidden" page. If you visit `google.com`, the proxy allows it, but Google sees the bank's IP, not your specific laptop's IP.

---

## 2. Reverse Proxy
A **Reverse Proxy** sits in front of one or more **web servers**. When a client sends a request to the website, the reverse proxy intercepts it before it reaches the origin server.

### How it works:
1. Client sends a request to `example.com`.
2. The Reverse Proxy receives the request.
3. The Proxy decides which backend server should handle the request (Load Balancing).
4. The Proxy fetches the response from the server and sends it back to the client.

### Why use it?
*   **Load Balancing:** Distributes incoming traffic across multiple servers so no single server is overwhelmed.
*   **SSL Termination:** Handles the heavy lifting of decrypting HTTPS requests, freeing up backend servers for application logic.
*   **Caching:** Stores copies of static content (like images) to serve them faster without hitting the origin server.
*   **Security:** Hides the existence and characteristics of the origin servers. It acts as an additional layer of defense against DDoS attacks.

### Real-World Example:
**Cloudflare or Nginx.** When you visit a popular site like `CNN.com` or `Medium.com`, you aren't hitting the "actual" server where the code lives. You are hitting a Reverse Proxy (like Cloudflare). Cloudflare checks if it has a cached version of the page (to serve it instantly) or routes your request to one of the hundreds of backend servers that is currently least busy.

---

## Summary Comparison Chart

| Feature | Forward Proxy | Reverse Proxy |
| :--- | :--- | :--- |
| **Protects** | Clients | Servers |
| **Sits in front of** | User/Internal Network | Web Servers/Application |
| **Primary Goal** | Privacy, Filtering, Bypassing | Load Balancing, Security, Caching |
| **Who knows it's there?** | Often the Client (configured in browser) | The Client doesn't know (it thinks it's the real server) |
| **Example Tool** | Squid, ProxyPool | Nginx, HAProxy, Apache |

---

## Proxies in System Design
In modern distributed systems, **Reverse Proxies** are essential. They allow developers to scale their applications horizontally (adding more servers) without changing how users access the site. They also provide a central point for logging, authentication, and traffic management.
