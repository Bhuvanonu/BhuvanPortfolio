// Define AngularJS application
angular.module('movieApp', [])
    .filter('currencyFormat', function () {
        return function (amount) {
            return '₹' + parseInt(amount).toLocaleString('en-IN');
        };
    })
    .controller('MainController', function ($scope, $timeout) {
        const vm = this;

        // Movie data
        vm.movies = [
            {
                id: 1,
                title: "Mark",
                poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvpSViXj5iHGnpK18Br8YwMd1mCyCZt-EfQlEeH58SaWqUVpDo5eCt0SpBZO8HeJuGm-yOEI8_470L2h-ObZj_ajYDDT3_Am9pNqlQuD5qCBbPw-FngEtp9TlE_c5sOMEqY_gCgxElK6WUPRxBDOiuwSRf2SDIj0DPBkuy96iWN5GAwtJZJUvipj9MDbXL/w1200-h630-p-k-no-nu/Mark-hit-or-flop.png",
                rating: 8.5,
                genre: "Action, Adventure, Sci-Fi",
                duration: "2h 28m",
                description: "Sudeep: The entire shoot of Mark happened in just 4 months. The trailer hints at a high-stakes thriller.",
                liked: true
            },
            {
                id: 2,
                title: "The Devil",
                poster: "https://images.filmibeat.com/img/popcorn/movie_posters/devil-20240216211814-22295.jpg",
                rating: 8.9,
                genre: "Action, Drama, Thriller",
                duration: "2h 56m",
                description: "A Saga of Power, Vengeance, and True Love.",
                liked: false
            },
            {
                id: 3,
                title: "Toxic: A Fairy Tale for Grown-ups",
                poster: "https://assets.gadgets360cdn.com/pricee/assets/product/202406/Toxic-A-Fairy-Tale-For-Grown-ups_1718603472.jpg",
                rating: 8.0,
                genre: "Adventure, Drama, Sci-Fi",
                duration: "2h 35m",
                description: "Directed by Geetu Mohandas, features Yash in the lead.",
                liked: false
            },
            {
                id: 4,
                title: "Dude",
                poster: "https://images.filmibeat.com/img/popcorn/movie_posters/dude-20250510180006-23621.jpg",
                rating: 7.3,
                genre: "Action, Comedy, Romantic",
                duration: "2h 43m",
                description: "Agan and Kural's journey of growth, choices, and change.",
                liked: false
            },
            {
                id: 5,
                title: "Brat",
                poster: "https://images.filmibeat.com/img/popcorn/movie_posters/brat-20250401180629-23631.jpg",
                rating: 6.7,
                genre: "Action, Thriller UA16+",
                duration: "2h 14m",
                description: "A gripping tale of a young man driven to defy his father.",
                liked: true
            },
            {
                id: 6,
                title: "Raajakumara",
                poster: "https://www.filmibeat.com/img/popcorn/movie_posters/rajakumara-20150424095934-14408.jpg",
                rating: 7.4,
                genre: "Action, Drama, UA",
                duration: "2h 12m",
                description: "Family drama starring Puneeth Rajkumar and Priya Anand.",
                liked: false
            },
            {
                id: 7,
                title: "Mahavatar Narsimha",
                poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mahavatar-narsimha-et00429292-1753248321.jpg",
                rating: 8.4,
                genre: "Action, Adventure, Drama",
                duration: "3h 1m",
                description: "When Faith is Challenged, He Appears.",
                liked: true
            },
            {
                id: 8,
                title: "Su From So",
                poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/su-from-so-et00454128-1752748088.jpg",
                rating: 7.7,
                genre: "Comedy, Horror UA16+",
                duration: "2h 49m",
                description: "In a quiet village, a boy's innocent crush unleashes strange events.",
                liked: false
            }
        ];

        // Filtered movie lists
        vm.nowShowingMovies = vm.movies.slice(0, 6);
        vm.recommendedMovies = vm.movies.slice(2, 8);

        // Booking state
        vm.showMovieModal = false;
        vm.selectedMovie = null;
        vm.currentStep = 'details';
        vm.selectedSeats = [];
        vm.ticketPrice = 250;
        vm.showSuccessMessage = false;

        // Show dates and times
        vm.showDates = [
            { label: 'Today', active: true },
            { label: 'Tomorrow', active: false },
            { label: '15 Oct', active: false },
            { label: '16 Oct', active: false },
            { label: '17 Oct', active: false }
        ];

        vm.showTimes = [
            { label: '10:00 AM', active: false },
            { label: '1:30 PM', active: false },
            { label: '4:00 PM', active: true },
            { label: '6:30 PM', active: false },
            { label: '9:00 PM', active: false }
        ];

        // Seat data
        vm.seatRows = [];

        // Payment state
        vm.paymentMethod = 'upi';
        vm.paymentDetails = {
            upiId: 'john.doe@upi',
            phone: '9876543210',
            email: 'john.doe@example.com',
            cardNumber: '4111 1111 1111 1111',
            expiryDate: '12/25',
            cvv: '123',
            cardName: 'John Doe'
        };

        // All movies modal
        vm.showAllMoviesModal = false;
        vm.allMoviesTitle = '';
        vm.allMoviesList = [];

        // Generate booking ID
        vm.bookingId = 'CMX' + Math.floor(100000 + Math.random() * 900000);

        // Initialize
        vm.init = function () {
            vm.checkUserSession();
            vm.generateSeats();
            vm.prefillPaymentForms();
        };

        // Prefill payment forms
        vm.prefillPaymentForms = function () {
            vm.paymentDetails = {
                upiId: 'john.doe@upi',
                phone: '9876543210',
                email: 'john.doe@example.com',
                cardNumber: '4111 1111 1111 1111',
                expiryDate: '12/25',
                cvv: '123',
                cardName: 'John Doe'
            };
        };

        // Check user session
        vm.checkUserSession = function () {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                vm.currentUser = JSON.parse(savedUser);
            }
        };

        // Scroll functions
        vm.scrollLeft = function (type) {
            const container = document.getElementById(type + '-grid');
            if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            }
        };

        vm.scrollRight = function (type) {
            const container = document.getElementById(type + '-grid');
            if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            }
        };

        // Open login modal
        vm.openLoginModal = function () {
            vm.showLoginModal = true;
        };

        // Handle sign up
        vm.handleSignUp = function () {
            const email = prompt('Enter your Name:');
            if (email) {
                vm.currentUser = {
                    name: email.split('@')[0],
                    email: email
                };
                localStorage.setItem('currentUser', JSON.stringify(vm.currentUser));
            }
        };

        // Handle sign out
        vm.handleSignOut = function () {
            if (confirm('Are you sure you want to sign out?')) {
                vm.currentUser = null;
                localStorage.removeItem('currentUser');
            }
        };

        // Open movie details - FIXED: Always passes $event parameter
        vm.openMovieDetails = function (movieId, event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            // Close any open modals first
            vm.showAllMoviesModal = false;

            vm.selectedMovie = vm.movies.find(m => m.id === movieId);
            if (!vm.selectedMovie) return;

            // Reset booking state for new booking
            vm.selectedSeats = [];
            vm.currentStep = 'details';
            vm.generateSeats();
            vm.showMovieModal = true;
        };

        // Close movie modal
        vm.closeMovieModal = function () {
            vm.showMovieModal = false;
        };

        // Toggle like for movie cards
        vm.toggleLike = function (movieId, event) {
            if (event) {
                event.stopPropagation();
            }

            const movie = vm.movies.find(m => m.id === movieId);
            if (movie) {
                movie.liked = !movie.liked;
            }
        };

        // Toggle like in modal
        vm.toggleLikeModal = function () {
            if (vm.selectedMovie) {
                vm.selectedMovie.liked = !vm.selectedMovie.liked;
            }
        };

        // Show step
        vm.showStep = function (step) {
            vm.currentStep = step;
        };

        // Select date
        vm.selectDate = function (date) {
            vm.showDates.forEach(d => d.active = false);
            date.active = true;
        };

        // Select time
        vm.selectTime = function (time) {
            vm.showTimes.forEach(t => t.active = false);
            time.active = true;
        };

        // Get show time text
        vm.getShowTime = function () {
            const selectedDate = vm.showDates.find(d => d.active);
            const selectedTime = vm.showTimes.find(t => t.active);
            return selectedDate && selectedTime ? `${selectedDate.label}, ${selectedTime.label}` : 'Today, 6:30 PM';
        };

        // Generate seats
        vm.generateSeats = function () {
            const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            const seatsPerRow = 10;
            vm.seatRows = [];

            rows.forEach(row => {
                const rowSeats = [];
                for (let i = 1; i <= seatsPerRow; i++) {
                    const seatId = `${row}${i}`;
                    const isOccupied = Math.random() < 0.2;
                    const isVip = (row === 'A' || row === 'B') && i >= 4 && i <= 7;

                    rowSeats.push({
                        id: seatId,
                        number: i,
                        status: isOccupied ? 'occupied' : 'available',
                        vip: isVip,
                        selected: false
                    });
                }
                vm.seatRows.push({ letter: row, seats: rowSeats });
            });
        };

        // Select seat
        vm.selectSeat = function (seat) {
            if (seat.status === 'occupied') return;

            if (seat.status === 'selected') {
                seat.status = 'available';
                vm.selectedSeats = vm.selectedSeats.filter(id => id !== seat.id);
            } else {
                seat.status = 'selected';
                vm.selectedSeats.push(seat.id);
            }
        };

        // Get selected seats text
        vm.getSelectedSeatsText = function () {
            return vm.selectedSeats.length > 0 ? vm.selectedSeats.join(', ') : 'None';
        };

        // Get GST amount
        vm.getGST = function () {
            const subtotal = vm.selectedSeats.length * vm.ticketPrice;
            return subtotal * 0.18;
        };

        // Get total amount
        vm.getTotalAmount = function () {
            const subtotal = vm.selectedSeats.length * vm.ticketPrice;
            const gst = subtotal * 0.18;
            return subtotal + gst;
        };

        // Select payment method
        vm.selectPaymentMethod = function (method) {
            vm.paymentMethod = method;
        };

        // Process payment
        vm.processPayment = function () {
            if (vm.selectedSeats.length === 0) {
                alert('Please select at least one seat');
                return;
            }

            // Generate new booking ID for confirmation
            vm.bookingId = 'CMX' + Math.floor(100000 + Math.random() * 900000);
            vm.showStep('confirmation');
        };

        // Download ticket
        vm.downloadTicket = function () {
            const downloadBtn = document.querySelector('.download-btn');
            const originalHtml = downloadBtn.innerHTML;

            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Ticket...';
            downloadBtn.disabled = true;

            const ticketElement = document.getElementById('ticket-template');

            html2canvas(ticketElement, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true
            }).then(canvas => {
                canvas.toBlob(function (blob) {
                    const link = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    const filename = `CineSpot-Ticket-${vm.selectedMovie.title.replace(/\s+/g, '-')}-${timestamp}.jpg`;

                    link.download = filename;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => URL.revokeObjectURL(url), 100);

                    vm.showSuccessMessage = true;
                    downloadBtn.innerHTML = originalHtml;
                    downloadBtn.disabled = false;

                    $timeout(function () {
                        vm.showSuccessMessage = false;
                    }, 3000);
                }, 'image/jpeg', 0.95);
            }).catch(error => {
                console.error('Error generating ticket:', error);
                alert('There was an error generating your ticket. Please try again.');
                downloadBtn.innerHTML = originalHtml;
                downloadBtn.disabled = false;
            });
        };

        // Back to home
        vm.backToHome = function () {
            vm.closeMovieModal();
            vm.resetBookingState();
        };

        // Reset booking state
        vm.resetBookingState = function () {
            vm.selectedSeats = [];
            vm.currentStep = 'details';
            vm.showSuccessMessage = false;
        };

        // Scroll to top
        vm.scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        //Scroll to contact section
        vm.scrollToSection = function (id) {
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        };

        // Show all movies - FIXED: Added event parameter and proper handling
        vm.showAllMovies = function (title, movieList, event) {
            if (event) {
                event.preventDefault();
            }

            vm.allMoviesTitle = title || 'All Movies';
            vm.allMoviesList = movieList || vm.movies;
            vm.showAllMoviesModal = true;
        };

        // Close all movies modal
        vm.closeAllMoviesModal = function () {
            vm.showAllMoviesModal = false;
        };

        // Initialize the controller
        vm.init();

        // Setup hover effect for scroll buttons
        $timeout(function () {
            const moviesContainers = document.querySelectorAll('.movies-container');
            moviesContainers.forEach(container => {
                container.addEventListener('mouseenter', function () {
                    const scrollBtns = this.querySelectorAll('.scroll-btn');
                    scrollBtns.forEach(btn => btn.style.opacity = '1');
                });

                container.addEventListener('mouseleave', function () {
                    const scrollBtns = this.querySelectorAll('.scroll-btn');
                    scrollBtns.forEach(btn => btn.style.opacity = '0');
                });
            });
        }, 100);
    });

// Initialize AngularJS
angular.element(document).ready(function () {
    angular.bootstrap(document, ['movieApp']);
});