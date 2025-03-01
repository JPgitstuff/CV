document.addEventListener("DOMContentLoaded", () => {
    const sideMenu = document.getElementById("sideMenu"),
          openMenuBtn = document.getElementById("openMenuBtn"),
          closeMenuBtn = document.getElementById("closeMenuBtn");

    const toggleMenu = (open) => {
        sideMenu.classList.toggle("open", open);
        openMenuBtn.style.opacity = open ? "0" : "1";
        
    };

    openMenuBtn.addEventListener("click", () => {
        toggleMenu(true);
    });
    closeMenuBtn.addEventListener("click", () => {
        toggleMenu(false);
    });
// Close the menu when clicked outside
    document.addEventListener("click", (event) => {
        if (!sideMenu.contains(event.target) && !openMenuBtn.contains(event.target)) {
            toggleMenu(false);
        }
    });

    window.onload = function() {
        ContentDisp('A')
        
    };

    function ContentDisp(char) {
        const section = document.getElementById("section"),
        content = document.getElementById("content");
        content.innerHTML = ''

        const contentMap = {
            'A': "<h1>About Me</h1>",
            'E': "<h2>Education</h2>",
            'H': "<h2>High School</h2>",
            'U': "<h2>University</h2> <p>I am currently pursuing a Bachelor's degree in Computing at Belgium Campus ITversity. My studies focus on software development, cloud computing, and IoT standards. Throughout my time here, I have gained practical experience through various projects and coursework, enhancing my technical skills and preparing me for real-world challenges in the tech industry.</p><p>Below are my academic results and achievements:</p><button id='openPDFBtn'>Open PDF</button><a href='AcademicPdf.pdf' id='pdfLink' style='display:none;'></a>",
            'C': "<h2>Contact</h2>"
        };

        // Set section content based on the char, or log a warning for invalid char
        section.innerHTML = contentMap[char] || console.warn("Unhandled case:", char);

        if (char === 'A') {
            About('AboutMe.html');
        }

        if (char === 'U') {
            About('Education.html');
            document.getElementById('openPDFBtn').addEventListener('click', function() {
                openPDFModal('AcademicPdf.pdf'); // Open the PDF modal
                 })
        };

    }

    // Handle dynamic click events for options
    const options = ['About','Education', 'HighSchool', 'University', 'Contact'];
    options.forEach(option => {
        document.getElementById(option).addEventListener("click", () => ContentDisp(option.charAt(0)));
    });

        // Load the about-me.html content into the section
        function About(string) {
            fetch(`${string}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('content').innerHTML = data;
                })
                .catch(error => console.error('Error loading the file:', error));
        }
    
    
    //dynamically create and open the PDF modal
    function openPDFModal(pdfPath) {
        
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'block';
        
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modal.appendChild(modalContent);

        // Create the close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-btn');
        closeButton.innerHTML = '×';
        modalContent.appendChild(closeButton);

        // Create the iframe to display the PDF
        const iframe = document.createElement('iframe');
        iframe.src = pdfPath; // Set the source to the PDF path
        iframe.width = '100%';
        iframe.height = '600px';
        modalContent.appendChild(iframe);

    
        document.body.appendChild(modal);

        // Close the modal
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        // Close the modal if the user clicks outside of the modal
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }


    });








   /* function ContentDisp(char) {
        const section1 = document.getElementById("section1");

        const contentMap = {
            'E': "<h2>Education</h2>",
            'H': "<h2>High School</h2><p>Details about high school education...</p>",
            'U': "<h2>University</h2><p>Details about university education...</p>",
            'C': "<h2>Contact</h2>"
        };

        // Set section content based on the char, or log a warning for invalid char
        section1.innerHTML = contentMap[char] || console.warn("Unhandled case:", char);
    }

    // Add event listeners dynamically to reduce repetition
    const sections = ['Education', 'HighSchool', 'University', 'Contact'];

    sections.forEach(section => {
        document.getElementById(section).addEventListener("click", () => {
            // Handle Education-specific logic
            if (section === 'Education') {
                // Toggle visibility of the Education popup
                document.getElementById("eduPopup").style.display = 
                    document.getElementById("eduPopup").style.display === 'block' ? 'none' : 'block';
            } else {
                // Set content for other sections
                ContentDisp(section.charAt(0));
           // }
        });
    });*/
