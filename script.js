/* =========================================================
   Portfólio Desenvolvedora de Sistemas
   Arquivo: script.js
   Funções: animações ao rolar, navbar dinâmica e menu mobile
   ========================================================= */

// Aguarda o carregamento completo do DOM antes de executar as interações.
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".custom-navbar");
    const revealElements = document.querySelectorAll(".reveal");
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    /**
     * Adiciona sombra e reduz levemente a navbar durante a rolagem.
     */
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    };

    /**
     * Fecha automaticamente o menu mobile ao clicar em um link.
     */
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                collapseInstance.hide();
            }
        });
    });

    /**
     * Observa elementos com a classe .reveal para aplicar animação suave
     * quando eles entram na área visível da tela.
     */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    /**
     * Destaca o link da navbar correspondente à seção visível.
     */
    const sections = document.querySelectorAll("section[id]");

    const activateCurrentNavLink = () => {
        let currentSectionId = "home";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    /**
     * Exibe uma resposta visual simples no envio do formulário.
     * Em um projeto real, esta parte pode ser conectada a um backend.
     */
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector("button[type='submit']");
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = "Mensagem enviada com sucesso! <i class='bi bi-check-circle ms-2'></i>";
            submitButton.classList.add("sent");

            contactForm.reset();

            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.classList.remove("sent");
            }, 3200);
        });
    }

    // Executa os comportamentos no carregamento e durante a rolagem.
    handleNavbarScroll();
    activateCurrentNavLink();

    window.addEventListener("scroll", () => {
        handleNavbarScroll();
        activateCurrentNavLink();
    });
});
