const currentDayElement = document.getElementById("currentDay");



// Gets current date and prints it on the brower 
const currentDate = Date.now();
currentDayElement.textContent = currentDate;
// Display current day in the format of date/ Month
$("#currentDay").text(dayjs().format("dddd, MMMM D"));


$(document).ready(function () {
    // Function to generate time blocks for standard business hours
    function TimeBlocks() {
        const container = $(".container-lg");
        if (container.length === 0) return;

        // Check if time blocks have already been generated
        if ($(".time-block").length === 0) {
            // Let time be from 9am to 5pm. 
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
    TimeBlocks();
    updateBlocks();

    // Update time blocks on scroll
    $(window).on("scroll", function () {
        // Check if user has scrolled to a certain position to display the changes in the Scheduler.
        var scrollPosition = $(window).scrollTop() + $(window).height();
        var documentHeight = $(document).height();

        if (scrollPosition >= documentHeight / 2) {
            TimeBlocks();
            updateBlocks();
        }
    });

    // Update time blocks every minute. This isn't a required code, however will be useful when determining the color code for past, present and future. 
    setInterval(updateBlocks, 60000); // Update every minute
});

