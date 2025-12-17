document.addEventListener("DOMContentLoaded", () => {

    /* ======================
       SLIDER CATEGORÍAS
    ====================== */

    const slider = document.getElementById("slider");
    const next = document.querySelector(".arrow.right");
    const prev = document.querySelector(".arrow.left");

    if (slider && next && prev) {

        // DUPLICAR CONTENIDO
        slider.innerHTML += slider.innerHTML;

        let autoSpeed = 0.6;
        let step = 320;
        let isUserInteracting = false;

        function autoScroll() {
            if (!isUserInteracting) {
                slider.scrollLeft += autoSpeed;

                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }

        // DETECTAR INTERACCIÓN
        ["mousedown", "touchstart", "wheel"].forEach(event => {
            slider.addEventListener(event, () => {
                isUserInteracting = true;
            }, { passive: true });
        });

        ["mouseup", "touchend"].forEach(event => {
            slider.addEventListener(event, () => {
                isUserInteracting = false;
            });
        });

        // FLECHAS
        next.addEventListener("click", () => {
            isUserInteracting = true;
            slider.scrollBy({ left: step, behavior: "smooth" });
            setTimeout(() => isUserInteracting = false, 800);
        });

        prev.addEventListener("click", () => {
            isUserInteracting = true;
            slider.scrollBy({ left: -step, behavior: "smooth" });

            setTimeout(() => {
                if (slider.scrollLeft < 0) {
                    slider.scrollLeft = slider.scrollWidth / 2;
                }
                isUserInteracting = false;
            }, 800);
        });

        autoScroll();
    }

    /* ======================
       MEGA MENÚ CATEGORÍAS
    ====================== */

    const categorias = document.querySelectorAll(".categorias-lista li");
    const panels = document.querySelectorAll(".panel");

    categorias.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const target = item.getAttribute("data-target");

            panels.forEach(panel => panel.classList.remove("activo"));

            const panelActivo = document.getElementById(target);
            if (panelActivo) {
                panelActivo.classList.add("activo");
            }
        });

        // 👇 SOPORTE MÓVIL (TOUCH / CLICK)
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");

            panels.forEach(panel => panel.classList.remove("activo"));

            const panelActivo = document.getElementById(target);
            if (panelActivo) {
                panelActivo.classList.add("activo");
            }
        });
    });

});
