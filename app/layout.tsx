import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Giskuy Birthday',
  description: 'Website ucapan selamat ulang tahun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased bg-[#121212]">
        {children}

        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Intersection Observer untuk animasi muncul (hidden -> show)
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                  }
                });
              });

              document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
              
              // Efek hati berjatuhan saat scroll
              document.addEventListener('scroll', function() {
                if (window.scrollY > 300 && Math.random() > 0.95) {
                  const heart = document.createElement('div');
                  heart.innerHTML = '❤️';
                  heart.style.cssText = 'position:fixed; top:-50px; z-index:9999; pointer-events:none;';
                  heart.style.left = Math.random() * 100 + 'vw';
                  heart.style.fontSize = Math.random() * 20 + 15 + 'px';
                  document.body.appendChild(heart);
                  
                  let pos = -50;
                  const fallInterval = setInterval(() => {
                    pos += 5;
                    heart.style.top = pos + 'px';
                    heart.style.opacity = 0.7 - (pos / window.innerHeight);
                    if (pos > window.innerHeight) {
                      clearInterval(fallInterval);
                      heart.remove();
                    }
                  }, 30);
                }
              });
            });
          `
        }} />
      </body>
    </html>
  )
}