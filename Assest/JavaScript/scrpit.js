const currentDayElement = document.getElementById("currentDay");



// Gets current date and prints it on the brower 
const timeNow = Date.now();
const currentDate = new Date(timeNow);
currentDayElement.textContent = currentDate;

// Display current day in the format of date/ Month
$("#currentDay").text(dayjs().format("dddd, MMMM D"));


$(document).ready(function () {
    // Function to generate time blocks for standard business hours
    function generateTimeBlocks() {
        const container = $(".container-lg");
        if (container.length === 0) return;

        // Check if time blocks have already been generated
        if ($(".time-block").length === 0) {
            for (let hour = 9; hour <= 17; hour++) {
                const blockId = `hour-${hour}`;
                const timeBlock = $(`
          <div id="${blockId}" class="row time-block">
            <div class="col-2 col-md-1 hour text-center py-3">${hour > 12 ? hour - 12 + 'PM' : (hour === 12 ? '12PM' : hour + 'AM')}</div>
            <textarea class="col-8 col-md-10 description" rows="3"></textarea>
            <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
            </button>
          </div>
        `);
                container.append(timeBlock);
            }
        }
    }

    // Function to update time block classes based on current time
    function updateBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    // Generate time blocks initially
    generateTimeBlocks();
    updateBlocks();

    // Update time blocks on scroll
    $(window).on("scroll", function () {
        // Check if user has scrolled to a certain position (e.g., halfway through the page)
        var scrollPosition = $(window).scrollTop() + $(window).height();
        var documentHeight = $(document).height();

        if (scrollPosition >= documentHeight / 2) {
            generateTimeBlocks();
            updateBlocks();
        }
    });

    // Update time blocks every minute
    setInterval(updateBlocks, 60000); // Update every minute
});

