

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
                if (!data[lang]) {
                    console.error(`⚠️ No hay datos para el idioma: ${lang}`);
                    return;
                }
    
                // Verificar y actualizar cada elemento solo si existe en el DOM
                const updateElement = (id, value) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = value || "";
                    else console.warn(`⚠️ No se encontró el elemento: ${id}`);
                };
    
                updateElement("language-label", data[lang].language_label);
                updateElement("name", data[lang].name);
                updateElement("presentation", data[lang].presentation);
                updateElement("bio-link", data[lang].bio);
                updateElement("zygoma-link", data[lang].zygoma);
                updateElement("fullarch-link", data[lang].full_arch);
                updateElement("bio-title", data[lang].bio_title);
                updateElement("contact-label", data[lang].contact);
                updateElement("email-label", data[lang].email);
                updateElement("contact-label-2", data[lang].contact);
                updateElement("contact-label-3", data[lang].contact);
                updateElement("zigomatic-title", data[lang].zigomatic_title);
                updateElement("zigomatic-desc-1", data[lang].zigomatic_desc_1);
                updateElement("zigomatic-desc-2", data[lang].zigomatic_desc_2);
                updateElement("zigomatic-desc-3", data[lang].zigomatic_desc_3);
                
                document.title = data[lang].name;

                 // 🔹 Permitir etiquetas HTML en fullarch_title
                const fullArchTitle = document.getElementById("fullarch-title");
                if (fullArchTitle) fullArchTitle.innerHTML = data[lang].fullarch_title;
    
                // 🔹 Actualizar la lista de la biografía
                const bioList = document.getElementById("bio-list");
                if (bioList) {
                    bioList.innerHTML = "";
                    data[lang].bio_items.forEach(item => {
                        const li = document.createElement("li");
                        li.innerHTML = item;
                        bioList.appendChild(li);
                    });
                }
    
                // 🔹 Actualizar la lista de temas de Zygomatic
                const zigomaticTopicsList = document.getElementById("zigomatic-topics");
                if (zigomaticTopicsList) {
                    zigomaticTopicsList.innerHTML = "";
                    if (Array.isArray(data[lang].zigomatic_topics)) {
                        data[lang].zigomatic_topics.forEach(topic => {
                            const li = document.createElement("li");
                            li.textContent = topic;
                            zigomaticTopicsList.appendChild(li);
                        });
                    } else {
                        console.warn(`⚠️ No hay temas de Zygomatic en ${lang}`);
                    }
                }
    
                // 🔹 Actualizar la descripción de Full Arch (manejo de array de párrafos)
                const fullArchDesc = document.getElementById("fullarch-desc");
                if (fullArchDesc) {
                    fullArchDesc.innerHTML = "";
                    data[lang].fullarch_desc.forEach(paragraph => {
                        const p = document.createElement("p");
                        p.innerHTML = paragraph;
                        fullArchDesc.appendChild(p);
                    });
                }
    
                // 🔹 Actualizar lista de temas de Full Arch
                const fullArchTopics = document.getElementById("fullarch-topics");
                if (fullArchTopics) {
                    fullArchTopics.innerHTML = "";
                    data[lang].fullarch_topics.forEach(topic => {
                        const li = document.createElement("li");
                        li.textContent = topic;
                        fullArchTopics.appendChild(li);
                    });
                }
            })
            .catch(error => console.error("Error cargando las traducciones:", error));
    
        // Verificar si los elementos están presentes en el DOM después de la ejecución
        console.log("🔍 Verificando elementos:");
        console.log("Zygomatic Title:", document.getElementById("zigomatic-title"));
        console.log("Zygomatic Desc 1:", document.getElementById("zigomatic-desc-1"));
        console.log("Zygomatic Desc 2:", document.getElementById("zigomatic-desc-2"));
        console.log("Zygomatic Desc 3:", document.getElementById("zigomatic-desc-3"));
        console.log("Zygomatic Topics:", document.getElementById("zigomatic-topics"));
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

