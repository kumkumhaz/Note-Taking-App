const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNotebtn = document.getElementById("addNote");
const notesLists = document.querySelector(".notes");
const addDate = document.getElementById('addDate');
const clearNotebtn = document.getElementById("clearNote");
const deleteAllbtn = document.getElementById("deleteAllNote");
const addNoteMessage= document.getElementById("addNoteMessage");
const appearDeletedNoteMessage= document.getElementById("appearDeletedNoteMessage");
const deletedMenu = document.getElementById("deletedMenu");
const deleteSection = document.getElementsByClassName("deleteSection")[0];
const homeMenu = document.getElementById("homeMenu");



showNotes();
homeMenu.addEventListener("click",()=>{
  deleteSection.style.display = "none";

})

deletedMenu.addEventListener('click', () => {
  deleteSection.style.display = 'block';
  isDeletedSectionVisible = true;
  handleDeletedNotesDisplay();
});

addTitle.addEventListener("input", ()=>{
  clearNotebtn.style.display = "block";
  deleteAllbtn.style.display = "none";
})

addText.addEventListener("input", ()=>{
  clearNotebtn.style.display = "block";
  deleteAllbtn.style.display = "none";
})

function addNotes(event) {
  event.preventDefault(); // prevent default form submission behavior
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null) {
    mynotes = [];
  } else {
    mynotes = JSON.parse(mynotes);
  }
  if (addText.value === "") {
    alert("Add a note!");
    return;
  }

  const noteobj = {
    title: addTitle.value,
    text: addText.value,
    date: addDate.value
  };
  mynotes.push(noteobj);
  localStorage.setItem('notes', JSON.stringify(mynotes));
   addNoteMessage.style.display = "none";

   // Check if dark mode is enabled by checking if 'darkMode.css' is used
   const isUsingDarkModeCSS = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('darkMode.css'));

   // Refresh the displayed notes and deleted notes based on the mode
   if (isUsingDarkModeCSS) {
     showDarkNotes();
   } else {
     showNotes();
   }
  addTitle.value = ""; // reset input field
  addText.value = ""; // reset textarea
  addDate.value = ""; // reset date
}

addNotebtn.addEventListener('click', function(event) {
  addNotes(event);

});





function showNotes() {
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null || mynotes.length === 0) {
     addNoteMessage.style.display = "block";
    return;
  } else {
    mynotes = JSON.parse(mynotes);
  }
  
  let notesHtml = '';
  for (let i = 0; i < mynotes.length; i++) {
    // adding random colors to the every notes
    const r = Math.floor(Math.random() * 76) + 180;
    const g = Math.floor(Math.random() * 76) + 180;
    const b = Math.floor(Math.random() * 76) + 180;

    // create a CSS style string with the random RGB values
    const color = `rgb(${r}, ${g}, ${b})`;
    const style = `background-color: ${color};`;

    const deleteIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg>`;
    const editIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
</svg>`;

    notesHtml += `
      <div class="card" style="${style}">
        <div class="editing">
          <button class="editnote" id=${i} onclick="editNote(${i})">${editIcon}</button>
          <button class="deletenote" id=${i} onclick="deleteNote(${i})">${deleteIcon}</button>
        </div>    
        <div class="title">${mynotes[i].title == "" ? "Untitled Note" : mynotes[i].title}</div>
        <div class="text">${mynotes[i].text}</div>
        <div class="date">
          ${mynotes[i].date ? `<div class="editdate">${mynotes[i].date}</div>` : ''}
        </div>
      </div>
    `;
  }
  notesLists.innerHTML = notesHtml;
  clearNotebtn.style.display = "none";
  deleteAllbtn.style.display = "block";
  
}
window.addEventListener('load', function() {
showDarkNotes();
showDeletedDarkNotes();
showNotes();
showDeletedNotes();
});

// Edit Note
function editNote(i) {
  const addNotebtn = document.getElementById("addNote");
  const saveNotebtn = document.getElementById("saveNote");
  const updateNote = document.getElementById("updateNote");
  updateNote.value = i;
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null) {
    return;
  } else {
    mynotes = JSON.parse(mynotes);
  }
  const note = mynotes[i];
  addTitle.value = note.title;
  addText.value = note.text;
  addDate.value = note.date;
  addNotebtn.style.display = "none";
  saveNotebtn.style.display = "block";
  deleteAllbtn.style.display = "none";
  clearNotebtn.style.display = "block";

    // Scroll to the title box
    const home = document.getElementById("home");
    home.scrollIntoView({ behavior: 'smooth' });
    addText.focus(); // Focus on the search input when it becomes visible

  
}

// Add event listener to the parent container
const notesContainer = document.getElementById('notesContainer');
notesContainer.addEventListener('click', handleNoteCardClick);

function handleNoteCardClick(event) {
  // Check if the clicked element or its parent is the "Edit" button
  if (event.target.classList.contains('editNoteBtn') || event.target.parentElement.classList.contains('editNoteBtn')) {
    // Redirect to the input box section
    window.location.href = '#home';
  }
}



// Save note or update
const saveNotebtn = document.getElementById("saveNote");
saveNotebtn.addEventListener("click", function() {
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null) {
    return;
  } else {
    mynotes = JSON.parse(mynotes);
  }
  const updateNote = document.getElementById("updateNote");
  mynotes[updateNote.value].title = addTitle.value;
  mynotes[updateNote.value].text = addText.value;
  mynotes[updateNote.value].date = addDate.value
  localStorage.setItem('notes', JSON.stringify(mynotes));
 // Check if dark mode is enabled by checking if 'darkMode.css' is used
 const isUsingDarkModeCSS = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('darkMode.css'));

 // Refresh the displayed notes and deleted notes based on the mode
 if (isUsingDarkModeCSS) {
   showDarkNotes();
 } else {
   showNotes();
 }

  addTitle.value = ""; // reset input field
  addText.value = ""; // reset textarea
  addDate.value = ""; // reset date
  addNotebtn.style.display = "block";
  saveNotebtn.style.display = "none";
});

// Reset the input
let clearbtn = document.getElementById("clearNote");
clearbtn.addEventListener("click", function() {
  addTitle.value = ""; // reset input field
  addText.value = "";
  deleteAllbtn.style.display = "block";
  clearNotebtn.style.display = "none";

});


deleteAllbtn.addEventListener("click", deleteAllNote );

function deleteAllNote(){
  let notes = localStorage.getItem("notes");
  let deletedNotes = localStorage.getItem('deleted');
  
  if ((notes === null || JSON.parse(notes).length === 0) && (deletedNotes === null || JSON.parse(deletedNotes).length === 0)) {
    alert("Nothing to delete. First, add notes."); // Show an alert message
  } else {
    const deleteConfirmation = confirm("Are you sure you want to delete all notes?");
    if (deleteConfirmation) {
      localStorage.removeItem("notes");
      localStorage.removeItem("deleted");
    }
  }
  // Refresh the page to update the UI
  location.reload();
}


// DELETE A PARTICULAR NOTE
// SEND NOTE TO DELETED SECTION

function deleteNote(index) {
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null) {
    return;
  } else {
    mynotes = JSON.parse(mynotes);
  }

  // Remove the note from the notes array
  const deletedNote = mynotes.splice(index, 1)[0];

  // Store the updated notes array in localStorage
  localStorage.setItem('notes', JSON.stringify(mynotes));

  // Move the deleted note to the "Deleted Notes" section
  moveNoteToDeletedSection(deletedNote);

  // Check if dark mode is enabled by checking if 'darkMode.css' is used
  const isUsingDarkModeCSS = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('darkMode.css'));

  // Refresh the displayed notes and deleted notes based on the mode
  if (isUsingDarkModeCSS) {
    showDarkNotes();
    showDeletedDarkNotes();
  } else {
    showNotes();
    showDeletedNotes();
  }
}



//DELETED section
// DELETE NOTE FROM HOME PAGE

function moveNoteToDeletedSection(deletedNote, index) {
  let deletedNotes = localStorage.getItem('deleted');
  if (deletedNotes === null) {
    deletedNotes = [];
    appearDeletedNoteMessage.style.display = "block"; // Show the message when the first note is added
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }

  deletedNote.index = index;

  deletedNotes.push(deletedNote);

  // Store the updated deleted notes array in localStorage
  localStorage.setItem('deleted', JSON.stringify(deletedNotes));
  appearDeletedNoteMessage.style.display = "none";

   // Check if deleted notes are empty and update the visibility of appearDeletedNoteMessage
   const notesArray = JSON.parse(localStorage.getItem('notes'));
   if (notesArray === null || notesArray.length === 0) {
     addNoteMessage.style.display = "block";
   } else {
     addNoteMessage.style.display = "none";
   }
}


function deleteNotePermanently(index) {
  const confirmDelete = confirm("Delete Permanently");
  if (confirmDelete) {
    let deletedNotes = localStorage.getItem('deleted');
    if (deletedNotes === null) {
      deletedNotes = [];
    } else {
      deletedNotes = JSON.parse(deletedNotes);
    }
    deletedNotes.splice(index, 1);
    localStorage.setItem('deleted', JSON.stringify(deletedNotes));
    // Check if dark mode is enabled by checking if 'darkMode.css' is used
    const isUsingDarkModeCSS = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('darkMode.css'));
    // Refresh the displayed deleted notes based on the mode
    if (isUsingDarkModeCSS) {
      showDeletedDarkNotes();
    } else {
      showDeletedNotes();
    }
     // Check if deleted notes are empty and update the visibility of appearDeletedNoteMessage
     const deletedNotesArray = JSON.parse(localStorage.getItem('deleted'));
     if (deletedNotesArray === null || deletedNotesArray.length === 0) {
       appearDeletedNoteMessage.style.display = "block";
     }
  }
}

function showDeletedNotes() {
  let deletedNotes = localStorage.getItem('deleted');
 if (deletedNotes === null || deletedNotes.length === 0) {
    appearDeletedNoteMessage.style.display = "block";
    return;
  } else {
        appearDeletedNoteMessage.style.display = "none";
    deletedNotes = JSON.parse(deletedNotes);
  }
  let deletedSection = document.getElementById('deletedSection');

  let deletedNotesHTML = '';

  for (let i = 0; i < deletedNotes.length; i++) {

    const r = Math.floor(Math.random() * 76) + 180;
    const g = Math.floor(Math.random() * 76) + 180;
    const b = Math.floor(Math.random() * 76) + 180;
    const color = `rgb(${r}, ${g}, ${b})`;
    const style = `background-color: ${color};`;

    const restoreIcon =`
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
`;
const deleteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`;

    deletedNotesHTML += `
      <div class="card" style="${style}">
        <div class="editing">
          <button class="restorenote" onclick="restoreNote(${i})">${restoreIcon}</button>
          <button class="deletenote" onclick="deleteNotePermanently(${i})">${deleteIcon}</button>
        </div>    
        <div class="title">${deletedNotes[i].title === "" ? "Untitled Note" : deletedNotes[i].title}</div>
        <div class="text">${deletedNotes[i].text}</div>
        <div class="date">
          ${deletedNotes[i].date ? `<div class="editdate">${deletedNotes[i].date}</div>` : ''}
        </div>
      </div>
    `;
  }

  deletedSection.innerHTML = deletedNotesHTML; // Add the updated HTML to the deletedSection
}




//RESTORE THE DELETED CARD
function restoreNote(index) {
  let deletedNotes = localStorage.getItem('deleted');
  if (deletedNotes === null) {
    return;
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }
  // Get the note to be restored
  const deletedNote = deletedNotes[index];

  // Remove the note from the `deletedNotes` array
  deletedNotes.splice(index, 1);

  // Store the updated `deletedNotes` array in localStorage
  localStorage.setItem('deleted', JSON.stringify(deletedNotes)); 
  // Move the note back to the "Notes" section
  moveNoteToNotesSection(deletedNote);

  // Check if dark mode is enabled by checking if 'darkMode.css' is used
  const isUsingDarkModeCSS = Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('darkMode.css'));

  // Refresh the displayed notes and deleted notes based on the mode
  if (isUsingDarkModeCSS) {
    showDarkNotes();
    showDeletedDarkNotes();
  } else {
    showNotes();
    showDeletedNotes();
  }
  
  // Check if deleted notes are empty and update the visibility of appearDeletedNoteMessage
  const updatedDeletedNotes = JSON.parse(localStorage.getItem('deleted'));
  if (updatedDeletedNotes === null || updatedDeletedNotes.length === 0) {
    appearDeletedNoteMessage.style.display = "block";
  } else {
    appearDeletedNoteMessage.style.display = "none";
  }
}



function moveNoteToNotesSection(deletedNote) {
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null) {
    mynotes = [];
    addNoteMessage.style.display = "block";
  } else {
    mynotes = JSON.parse(mynotes);
  }
  // Add the note back to the `notes` array
  mynotes.push(deletedNote);
  // Store the updated `notes` array in localStorage
  localStorage.setItem('notes', JSON.stringify(mynotes));
  addNoteMessage.style.display = "none"
   // Check if deleted notes are empty and update the visibility of appearDeletedNoteMessage
   const deletedNotesArray = JSON.parse(localStorage.getItem('deleted'));
   if (deletedNotesArray === null || deletedNotesArray.length === 0) {
     appearDeletedNoteMessage.style.display = "block";
   }else{
     appearDeletedNoteMessage.style.display = "none";
   }
}





  
// SEARCH FUNCTIONALITY
 
const searchInput = document.getElementById("search");
const searchIcon = document.getElementById("searchicon");
const noResultsMessage = document.getElementById("noResultsMessage");

// Add event listeners
searchInput.addEventListener("input", performSearch);
searchIcon.addEventListener("click", function() {
  // Toggle the visibility of the search input box
  searchInput.style.display = 'block';
  searchInput.focus(); // Focus on the search input when it becomes visible
  searchIcon.style.display = 'none';

  // Call the search function to perform the search
  performSearch();
});

// Function to perform search
function performSearch() {
  const searchedText = searchInput.value.toLowerCase();
  const allNotes = notesLists.getElementsByClassName("card");
  let resultCount = 0;

  for (let i = 0; i < allNotes.length; i++) {
    const note = allNotes[i];
    const noteTitle = note.querySelector(".title").textContent.toLowerCase();
    const noteText = note.querySelector(".text").textContent.toLowerCase();
    const showSearchedResult =
      noteTitle.includes(searchedText) || noteText.includes(searchedText);

    note.style.display = showSearchedResult ? "block" : "none";

    if (showSearchedResult) {
      resultCount++;
    }
  }

  noResultsMessage.style.display = resultCount === 0 ? "block" : "none";
}


//HEMBURGER
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navmenu = document.querySelector('.navmenu');

  burger.addEventListener('click', () => {
    navmenu.classList.toggle('show');
  });

  const body = document.body;

  function hideHamburgerMenu(event) {
    if (event.target !== burger && !navmenu.contains(event.target)) {
      navmenu.classList.remove('show');
    }
  }

  body.addEventListener('click', hideHamburgerMenu);
});




// LIGHT AND DARK MODE
let lightMode = document.getElementsByClassName("lightMode")[0];
let darkMode = document.getElementsByClassName("darkMode")[0];
let toggleMode = document.getElementById("darkLightMode");
let themeStyle = document.getElementById("themeStyle");

// // Set the default mode to myNotes.css
themeStyle.href = "myNotes.css";

lightMode.addEventListener("click", () => {
  darkMode.style.display = "block";
  lightMode.style.display = "none";
});
darkMode.addEventListener("click", () => {
  darkMode.style.display = "none";
  lightMode.style.display = "block";

});


let isDeletedSectionVisible = false; // Flag to track if the deleted section is currently visible

// Function to handle showing deleted notes based on the current mode
function handleDeletedNotesDisplay() {
  if (isDeletedSectionVisible) {
    if (themeStyle.getAttribute('href') === 'darkMode.css') {
      showDeletedDarkNotes();
    } else {
      showDeletedNotes();
    }
  }
}

// Modify the toggleMode event listener to handle showing deleted notes when switching modes
toggleMode.addEventListener('click', () => {
  if (themeStyle.getAttribute('href') === 'myNotes.css') {
    themeStyle.href = 'darkMode.css';
    addTitle.classList.add('dark-mode-input');
    addText.classList.add('dark-mode-input');
    addDate.classList.add('dark-mode-input');
    showDarkNotes();
  } else {
    themeStyle.href = 'myNotes.css';
    addTitle.classList.remove('dark-mode-input');
    addText.classList.remove('dark-mode-input');
    addDate.classList.remove('dark-mode-input');
    showNotes();
  }

  handleDeletedNotesDisplay();
});




function showDeletedDarkNotes() {
  let deletedNotes = localStorage.getItem('deleted');
  if (deletedNotes === null || deletedNotes.length === 0) {
     appearDeletedNoteMessage.style.display = "block";
     return;
  } else {
     appearDeletedNoteMessage.style.display = "none";
     deletedNotes = JSON.parse(deletedNotes);
  }


  let deletedSection = document.getElementById('deletedSection');

  let deletedNotesHTML = '';

  for (let i = 0; i < deletedNotes.length; i++) {

    const min = 40; // Minimum RGB value (0-255)
    const max = 100; // Maximum RGB value (0-255)
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    const color = `rgb(${r}, ${g}, ${b})`;
    const style = `background-color: ${color};`;

    const restoreIcon =`
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>
`;
const deleteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`;

    deletedNotesHTML += `
      <div class="card" style="${style}">
        <div class="editing">
          <button class="restorenote" onclick="restoreNote(${i})">${restoreIcon}</button>
          <button class="deletenote" onclick="deleteNotePermanently(${i})">${deleteIcon}</button>
        </div>    
        <div class="title">${deletedNotes[i].title == "" ? "Untitled Note" : deletedNotes[i].title}</div>
        <div class="text">${deletedNotes[i].text}</div>
        <div class="date">
          ${deletedNotes[i].date ? `<div class="editdate">${deletedNotes[i].date}</div>` : ''}
        </div>
      </div>
    `;
  }

  deletedSection.innerHTML = deletedNotesHTML; // Add the updated HTML to the deletedSection
}


function showDarkNotes() {
  let mynotes = localStorage.getItem('notes');
  if (mynotes === null || mynotes.length === 0) {
     addNoteMessage.style.display = "block";
    return;
  } else {
    mynotes = JSON.parse(mynotes);
  }
  let notesHtml = '';
  for (let i = 0; i < mynotes.length; i++) {
    // adding random colors to the every notes
    const min = 40; // Minimum RGB value (0-255)
    const max = 100; // Maximum RGB value (0-255)
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    // create a CSS style string with the random RGB values
    const color = `rgb(${r}, ${g}, ${b})`;
    const style = `background-color: ${color};`;

    const deleteIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg>`;
    const editIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
</svg>`;

    notesHtml += `
      <div class="card" style="${style}">
        <div class="editing">
          <button class="editnote" id=${i} onclick="editNote(${i})">${editIcon}</button>
          <button class="deletenote" id=${i} onclick="deleteNote(${i})">${deleteIcon}</button>
        </div>    
        <div class="title">${mynotes[i].title == "" ? "Untitled Note" : mynotes[i].title}</div>
        <div class="text">${mynotes[i].text}</div>
        <div class="date">
          ${mynotes[i].date ? `<div class="editdate">${mynotes[i].date}</div>` : ''}
        </div>
      </div>
    `;
  }
  notesLists.innerHTML = notesHtml;
  clearNotebtn.style.display = "none";
  deleteAllbtn.style.display = "block";
  
}