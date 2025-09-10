const papersDB = [
           
            {
                id: 1, 
                year: 2022,
                semester: 1,
                subject: "Software Development Framework",
                type: "End-Semester",
                                link: "papers/2022_Sem1_SDF_EndSem.pdf"
            }
            // You can add more real papers here.
        ];

        const years = [2022, 2023, 2024, 2025];
        const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
        const types = ["Mid-Semester", "End-Semester", "Viva"];
        const subjects = [
            "Data structures using Python Programming", "Algorithms Design for Computer Applications", "Life Skills",
            "Foundation of Entrepreneurship", "Operating System Essentials", "Software Development Framework",
            "Information and Database Management Systems", "Computer Network-Layers and Protocols",
            "Professionals Ethics, Patent, Copyrights and IPR", "Seminar/Project: Lean Startups", "Statistical Machine Learning",
            "Introduction to Blockchain", "Linux and Shell Programming", "Data Analysis using Python", "UI/UX Design",
            "Cloud Computing", "Intelligent Model Design using AI", "Blockchain Engineering", "System and Network Security",
            "Data Mining and Predictive Modelling", "Advanced Computer Vision and Video Analytics", "Natural Language Processing",
            "Social Network Analysis", "Reinforcement Learning"
        ];

        // Function to generate a diverse set of mock data to supplement the real data
        function generateMockData() {
            let id = papersDB.length + 1; // Start ID after real papers
            years.forEach((year, index) => {
                const yearSemesters = [index * 2 + 1, index * 2 + 2];
                yearSemesters.forEach(semester => {
                    if (semesters.includes(semester)) {
                        const semesterSubjects = [...subjects].sort(() => 0.5 - Math.random()).slice(0, 7);
                        semesterSubjects.forEach(subject => {
                            types.forEach(type => {
                                if (Math.random() > 0.3) {
                                    papersDB.push({
                                        id: id++, year: year, semester: semester, subject: subject, type: type,
                                        link: `#` // Placeholder link for mock data
                                    });
                                }
                            });
                        });
                    }
                });
            });
        }
 generateMockData(); // Call this to add filler data

        // --- DOM ELEMENTS ---
        const yearSelect = document.getElementById('year-select');
        const semesterSelect = document.getElementById('semester-select');
        const typeSelect = document.getElementById('type-select');
        const resultsContainer = document.getElementById('results-container');
        const noResultsMessage = document.getElementById('no-results');

        // --- FUNCTIONS ---
        function renderPapers(papers) {
            resultsContainer.innerHTML = '';
            if (papers.length === 0) {
                noResultsMessage.classList.remove('hidden');
                resultsContainer.classList.add('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
                resultsContainer.classList.remove('hidden');
            }
            papers.forEach(paper => {
                const card = document.createElement('a');
                card.href = paper.link;
                card.target = "_blank";
                card.className = "interactive-element bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 block";
                let iconSvg = '';
                let typeColor = '';
                switch (paper.type) {
                    case 'Mid-Semester':
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`;
                        typeColor = 'bg-blue-100 text-blue-800';
                        break;
                    case 'End-Semester':
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`;
                        typeColor = 'bg-green-100 text-green-800';
                        break;
                    case 'Viva':
                        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V8z" /></svg>`;
                        typeColor = 'bg-yellow-100 text-yellow-800';
                        break;
                }
                card.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <p class="text-sm text-gray-500">${paper.year} &middot; Semester ${paper.semester}</p>
                            <h3 class="font-semibold text-lg mt-1 text-gray-800">${paper.subject}</h3>
                        </div>
                        <div class="text-gray-400">${iconSvg}</div>
                    </div>
                    <div class="mt-4">
                        <span class="text-xs font-medium px-3 py-1 rounded-full ${typeColor}">${paper.type}</span>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
            addCursorInteractionListeners();
        }

        function filterAndRender() {
            const selectedYear = yearSelect.value;
            const selectedSemester = semesterSelect.value;
            const selectedType = typeSelect.value;
            const filteredPapers = papersDB.filter(paper => {
                const yearMatch = selectedYear === 'all' || paper.year == selectedYear;
                const semesterMatch = selectedSemester === 'all' || paper.semester == selectedSemester;
                const typeMatch = selectedType === 'all' || paper.type === selectedType;
                return yearMatch && semesterMatch && typeMatch;
            });
            filteredPapers.sort((a, b) => b.year - a.year || a.semester - b.semester);
            renderPapers(filteredPapers);
        }

        // --- EVENT LISTENERS & INITIAL RENDER ---
        yearSelect.addEventListener('change', filterAndRender);
        semesterSelect.addEventListener('change', filterAndRender);
        typeSelect.addEventListener('change', filterAndRender);
        window.addEventListener('load', () => { filterAndRender(); });

        // --- CUSTOM CURSOR SCRIPT ---
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        });
        function addCursorInteractionListeners() {
            const interactiveElements = document.querySelectorAll('.interactive-element');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseover', () => { document.body.classList.add('cursor-interact'); });
                el.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-interact'); });
            });
        }
        addCursorInteractionListeners();
