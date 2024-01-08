const currentDayElement = document.getElementById("currentDay");



// Gets current date and prints it on the brower 
const currentDate = Date.now();
currentDayElement.textContent = currentDate;
// Display current day in the format of date/ Month
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

$(document).ready(function () {
    // Function to generate time blocks for standard business hours
    function generateTimeBlocks() {
        const container = $("#time-blocks-container");
        container.empty(); // Clear previous content before regenerating

        // Generate time blocks for hours from 9am to 5pm
        for (let hour = 9; hour <= 17; hour++) {
            const blockId = `hour-${hour}`;
            const timeBlock = $(`
                <div id="${blockId}" class="row time-block">
                    <!-- Include the hour label, textarea, and save button -->
                    <div class="col-2 col-md-1 hour text-center py-3">${hour > 12 ? hour - 12 + 'PM' : (hour === 12 ? '12PM' : hour + 'AM')}</div>
                    <textarea id="event-${hour}" class="col-8 col-md-10 description" rows="3"></textarea>
                    <button class="btn saveBtn col-2 col-md-1" onclick="saveEvent('${hour}')" aria-label="save">
                        <i class="fas fa-save" aria-hidden="true"></i>
                    </button>
                </div>
            `);
            container.append(timeBlock);
        }
    }
    $(document).on("click", ".saveBtn", function () {
        const hour = $(this).closest(".time-block").attr("id").split("-")[1];
        const eventText = $(`#event-${hour}`).val();
        localStorage.setItem(`event-${hour}`, eventText);
    });

    // Event listener for entering events when a textarea is clicked
    $(document).on("click", ".description", function () {
        // Implement any specific functionality when the textarea is clicked (if needed)
    });

    // Function to save event to local storage
    function saveEvent(hour) {
        const eventText = $(`#event-${hour}`).val(); // Get event text from textarea
        localStorage.setItem(`event-${hour}`, eventText); // Save event text to local storage
    }

    // Function to load events from local storage and display them on page load
    function loadEvents() {
        for (let hour = 9; hour <= 17; hour++) {
            const savedEvent = localStorage.getItem(`event-${hour}`); // Retrieve saved event from local storage
            if (savedEvent) {
                $(`#event-${hour}`).val(savedEvent); // Display saved event in the textarea
            }
        }
    }

    


    // Function to update time block classes based on current time, Also to Highligh the time of the day, my adding gray, red or green (Each representing a meaning)
    function updateBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            // if else statement to determine what color-coded past, present and future 
            if (blockHour < currentHour) {
                // if the blockedHour is less than current time, remove the present and future class and add pass class to it. Which changes the block to gray color. 
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                // if the blockhour is equal to the current time, remove the past and future class and add the present class to it. Which changes the block color to red. 
                $(this).removeClass("past future").addClass("present");
            } else {
                // else if the time has not passed yet, remove the past and present class and add the future call to it. Which makes is green. 
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    // Generate time blocks initially
    generateTimeBlocks();
    updateBlocks();
    loadEvents();
});

// Update time blocks on scroll
$(window).on("scroll", function () {
    // Check if user has scrolled to a certain position to display the changes in the Scheduler.
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var documentHeight = $(document).height();

    if (scrollPosition >= documentHeight / 2) {
        generateTimeBlocks();
        updateBlocks();
    }
});

// Update time blocks every minute. This isn't a required code, however will be useful when determining the color code for past, present and future. 
setInterval(updateBlocks, 60000); // Update every minute

