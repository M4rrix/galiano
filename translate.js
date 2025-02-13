document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");

    // Cargar el idioma almacenado en localStorage o por defecto en español
    const savedLang = localStorage.getItem("selectedLang") || "es";
    languageSelector.value = savedLang;
    changeLanguage(savedLang);

    languageSelector.addEventListener("change", (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem("selectedLang", selectedLang); // Guardar preferencia
        changeLanguage(selectedLang);
    });

    function changeLanguage(lang) {
        fetch("translate.json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("language-label").textContent = data[lang].language_label;
                document.getElementById("name").textContent = data[lang].name;
                document.getElementById("presentation").textContent = data[lang].presentation;
                document.getElementById("bio-link").textContent = data[lang].bio;
                document.getElementById("zygoma-link").textContent = data[lang].zygoma;
                document.getElementById("fullarch-link").textContent = data[lang].full_arch;
                document.getElementById("bio-title").textContent = data[lang].bio_title;
                
                // Actualizar la lista de la biografía
                const bioList = document.getElementById("bio-list");
                bioList.innerHTML = ""; // Limpiar lista actual
                data[lang].bio_items.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = item;
                    bioList.appendChild(li);
                });

                document.getElementById("contact-label").textContent = data[lang].contact;
                document.getElementById("email-label").textContent = data[lang].email;
                document.getElementById("zigomatic-title").textContent = data[lang].zigomatic_title;
                document.getElementById("zigomatic-desc-1").textContent = data[lang].zigomatic_desc_1;
                document.getElementById("zigomatic-desc-2").textContent = data[lang].zigomatic_desc_2;
                document.getElementById("contact-label-2").textContent = data[lang].contact;
                document.getElementById("fullarch-title").textContent = data[lang].fullarch_title;
                document.getElementById("fullarch-desc").textContent = data[lang].fullarch_desc;
                document.getElementById("contact-label-3").textContent = data[lang].contact;

                document.title = data[lang].name; // Cambiar título de la pestaña
            })
            .catch(error => console.error("Error cargando las traducciones:", error));
    }

    const languageContainer = document.querySelector(".language-container");
    const mainSections = document.querySelectorAll("#main article");

    function toggleLanguageSelector() {
        const isActive = Array.from(mainSections).some(section => section.classList.contains("active"));
        languageContainer.style.display = isActive ? "none" : "flex";
    }

    // Escuchar cambios en las clases de los artículos
    const observer = new MutationObserver(toggleLanguageSelector);
    mainSections.forEach(section => observer.observe(section, { attributes: true, attributeFilter: ["class"] }));

    toggleLanguageSelector(); // Ejecutar en carga inicial
});
