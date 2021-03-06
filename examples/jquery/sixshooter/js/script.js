/*

Six Shooter
Pippin Barr

On clicking on the trigger, we change the text of the next  'Bullet' to 'Bang!',
make it red, and animate it quickly across the screen. We also have a reload
button for 'restocking' our bullet.

*/

// Variable to store the two interactive elements on the page
// We store them at the beginning of the program for a (tiny) efficiency gain
// because we only ask jQuery to find them on the page one time
let $trigger;
let $reload;

// We use "document ready" so that our code only runs once the whole
// webpage is loaded and ready.

$(document).ready(function() {

  // We use the jQuery 'click' event to "listen" for clicks on our
  // trigger div.

  $trigger = $('#trigger');
  console.log($trigger)
  $reload = $('#reload');

  // Listen to clicks on the trigger
  $trigger.on('click', fire);

  // We also need to react to clicks on the reload
  $reload.on('click', reload);

});

// fire()
//
// Called when the trigger is clicked. If there is an available bullet
// adds the fired class so it goes across the screen. If there are no
// bullets, shows a "click" to indicate empty gun.
function fire() {
  // Get the FIRST available element of class bullet that does NOT
  // have the class fired, not how this combines jQuery selection
  // and jQuery conditionals to pick exactly what we want
  let $bullet = $('.bullet').not('.fired').first();
  // Check if we got a bullet back (there might be none!)
  // We can check the length property of the jQuery object returned
  // It will be equal to 0 if there's no bullet selected
  if ($bullet.length === 0) {
    // If there's no bullet we will show it by having the trigger
    // briefly say "click!" in a new style. Again note the chaining.
    $trigger.text("Click!").addClass('dry-fire');
    // Then we will reset the trigger back to normal after a timeout
    setTimeout(() => {
      $trigger.text("Trigger").removeClass('dry-fire');
    }, 500);
  }
  else {
    // If we're here, there was a bullet to fire!
    // Set the text of the selected bullet to 'Bang!'
    $bullet.text("Bang!");
    // Animate the 'fire' class on so the bullet moves across the screen
    // Note that I had to include jQuery UI in my libraries in index.html
    // in order to be able ANIMATE addClass like this
    $bullet.addClass('fire', 250);
    // Add the fired class to style the bullet to
    // signal that it has been fired
    $bullet.addClass('fired');
  }
}

// reload()
//
// Called on clicking the reload button. Adds one of any existing
// fired bullets back to the "chamber" by removing its fired status.
function reload() {
  // We'll use a pretty impressive CHAIN of jQuery functions here
  // I'm writing each step on a new line so it's a bit easier to read,
  // but they're being sequentially applied
  $('.fired') // Select all the elements with class 'fired'
    .last() // Select the LAST one of them (the most recently fired one)
    .text('Bullet') // Set its text back to "Bullet"
    .removeClass('fired') // Remove the class fired (to reset colour and font style)
    .removeClass('fire'); // Remove the class fire to reset to default location

  // The result of changing the text and removing those classes is the bullet
  // returning to its default state "in the gun"
}