# SecuriHeader

**SecuriHeader** is a tool that analyzes the **HTTP response headers** of any website and checks for missing or misconfigured security-related headers like `X-Frame-Options`, `Content-Security-Policy`, and more.
It’s ideal for developers, web admins, and security-conscious users looking to audit basic web hygiene.  
With a clean interface and instant results, you can assess how secure your web headers are with ease.
**Live Demo**: [scrihdr.thecma.xyz](https://scrihdr.thecma.xyz)

---

## Features
- Blazing fast scans
- Checks for key headers like:
- Content-Security-Policy
- X-Frame-Options
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Shows which headers are missing, present, or misconfigured
- Responsive and intuitive UI
- Dockerized for easier deployment

---

## Screenshots
| Home | Security Header Analysis | All Response Headers |
|--------------|----------------|---------|
| ![Home](/media/scrihdr1.png) | ![Security Header Analysis](/media/scrihdr2.png) | ![All Response Headers](/media/scrihdr3.png) |

---

## Tech Stack

**Frontend**
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

**Backend**
- [Python](https://www.python.org/)
- REST API for header analysis

**Deployment**
- **Frontend**: [Netlify](https://www.netlify.com/)
- **Backend**: [Render](https://render.com/)
- **Containerization**: [Docker](https://www.docker.com/)

---

## Getting Started (Dev Environment)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chrismat-05/securiheader.git
   cd securiheader
    ```
2. **Start the Backend Server:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```
4. **Create a .env file inside the frontend folder and set your backend URL:**
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```
   Replace http://localhost:8000 with your actual backend URL.
5. **Run the frontend:**
   ```bash
   npm run dev
   ```
6. **Docker (for full stack):**
```bash
   docker-compose up --build
```

---

## Contributing
We welcome contributions from the community!
Check out the [Contributing Guidelines](/CONTRIBUTING_GUIDELINES.md)
Please read our [Code of Conduct](/CODE_OF_CONDUCT.md)

---

## LICENSE
This project is licensed under the MIT License.
See the full license [here](/LICENSE).

---

## Author
Created and maintained by [Chris Mathew Aje](https://thecma.xyz)

---

## Feedback & Support
Found a bug or want to suggest a feature?
Open an issue or reach out to [me](mailto:chrismaje63@gmail.com)
