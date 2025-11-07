document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const texts = [
            "JOSHUA ABDIEL.",
            "UNTARIAN | 2023-2027.",
            "INFORMATION SYSTEM MAJOR.",
            "SANTO FRANSISKUS ASISI GRADUATE.",
            "INSPIRING FRONT-END DEVELOPER."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }


    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    const projectTriggers = document.querySelectorAll('.project-modal-trigger');
    
    if (projectTriggers.length > 0) {
        
        const modalOverlay = document.getElementById('project-modal-overlay');
        const modalTitle = document.getElementById('modal-project-title');
        const modalNumber = document.getElementById('modal-project-number');
        const modalTechContainer = document.getElementById('modal-project-tech');
        const modalDescription = document.getElementById('modal-project-description');
        const modalLink = document.getElementById('modal-project-link');
        const modalLinkText = document.getElementById('modal-project-link-text');
        const modalCloseBtn = document.getElementById('project-modal-close-btn');

        function openProjectModal(e) {
            e.preventDefault(); 
            
            const trigger = e.currentTarget;
            
            const title = trigger.dataset.title;
            const number = trigger.dataset.number;
            const description = trigger.dataset.description;
            const techString = trigger.dataset.tech;
            const link = trigger.dataset.link;
            const linkText = trigger.dataset.linkText;
            const linkType = trigger.dataset.linkType || 'external';
            
            modalTitle.textContent = title;
            modalNumber.textContent = number;
            modalDescription.textContent = description;
            modalLinkText.textContent = linkText;
            
            modalLink.href = link;
            modalLink.dataset.pdfSrc = '';
            modalLink.classList.remove('pdf-trigger');

            if (linkType === 'pdf') {
                modalLink.href = 'javascript:void(0)';
                modalLink.removeAttribute('target');
                modalLink.classList.add('pdf-trigger');
                modalLink.dataset.pdfSrc = link;
            } else {
                modalLink.href = link;
                modalLink.setAttribute('target', '_blank');
            }
            
            modalTechContainer.innerHTML = ''; 
            const techArray = techString.split(',');
            
            techArray.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech.trim();
                modalTechContainer.appendChild(tag);
            });
            
            modalOverlay.classList.add('visible');
        }

        function closeProjectModal() {
            modalOverlay.classList.remove('visible');
        }

        projectTriggers.forEach(trigger => {
            trigger.addEventListener('click', openProjectModal);
        });

        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    const pdfOverlay = document.getElementById('pdf-modal-overlay');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfCloseBtn = document.getElementById('pdf-modal-close-btn');

    function openPdfModal(pdfSrc) {
        pdfIframe.src = pdfSrc;
        pdfOverlay.classList.add('visible');
    }

    function closePdfModal() {
        pdfOverlay.classList.remove('visible');
        pdfIframe.src = '';
    }

    if (pdfCloseBtn) {
        pdfCloseBtn.addEventListener('click', closePdfModal);
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.matches('#modal-project-link.pdf-trigger') || e.target.closest('#modal-project-link.pdf-trigger')) {
            e.preventDefault();
            const trigger = e.target.closest('#modal-project-link.pdf-trigger');
            const pdfSrc = trigger.dataset.pdfSrc;
            if (pdfSrc) {
                openPdfModal(pdfSrc);
            }
        }
    });
    
    const certTriggers = document.querySelectorAll('.certificate-modal-trigger');
    
    if (certTriggers.length > 0) {
        
        const certModalOverlay = document.getElementById('certificate-modal-overlay');
        const certModalImage = document.getElementById('certificate-modal-image');
        const certModalCloseBtn = document.getElementById('certificate-modal-close-btn');

        function openCertificateModal(e) {
            const trigger = e.currentTarget;
            const imageSrc = trigger.querySelector('img').src;
            
            certModalImage.src = imageSrc;
            certModalOverlay.classList.add('visible');
        }

        function closeCertificateModal() {
            certModalOverlay.classList.remove('visible');
            certModalImage.src = "";
        }

        certTriggers.forEach(trigger => {
            trigger.addEventListener('click', openCertificateModal);
        });

        certModalCloseBtn.addEventListener('click', closeCertificateModal);
        certModalOverlay.addEventListener('click', (e) => {
            if (e.target === certModalOverlay) {
                closeCertificateModal();
            }
        });
    }

});