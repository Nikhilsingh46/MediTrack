# MediTrack -trackurdose

> Your simple medication tracking companion.

MediTrack is a lightweight web app that helps people remember and track their daily medicines. Many elderly people and patients with long-term illnesses forget a dose or take it at the wrong time. MediTrack gives them one clear screen that shows what to take today and what is already done.

**Live demo:** https://meditrack-trackurdose.netlify.app/


## Features

- Add a medicine with its name, dose, and time
- Today's schedule, sorted from the earliest dose to the latest
- Mark a dose as taken (and undo it)
- Progress bar that shows how many doses are done today
- Doses reset automatically every new day
- Delete a medicine, with a confirmation message
- Data is saved in the browser, so it stays after a refresh
- Fully responsive layout for phones, tablets, and laptops
- Time shown in an easy 12-hour format (for example, 2:00 PM)

## Built With

- HTML5
- CSS3 (Flexbox, CSS variables, media queries)
- JavaScript (ES6)
- Browser localStorage for saving data

## Project Structure

```
meditrack/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Getting Started

No installation is needed.

1. Clone the repository:
```
   git clone https://github.com/your-username/meditrack.git
```
2. Open the project folder.
3. Open `index.html` in your browser, or use the Live Server extension in VS Code.

## How It Works

1. The user fills in the form and clicks **Add medicine**.
2. JavaScript stores the medicine in a list and saves it to localStorage.
3. The page draws the cards again from the saved list.
4. When the user clicks **Mark as taken**, the card turns green and the progress bar moves.
5. On a new day, all doses go back to "not taken", and the medicines stay saved.

## Limitations

- Data is stored only in one browser on one device. Clearing the browser data, or using private mode, removes it.
- There are no notifications yet.

## Roadmap

- [ ] Browser notifications at dose time
- [ ] Edit an existing medicine
- [ ] Export and import data as a backup file
- [ ] Dose history (taken and missed)
- [ ] Dark mode
- [ ] Installable PWA with offline support
- [ ] Rebuild with React.js

## What I Learned

- Building a dynamic page from data with JavaScript
- Saving and loading data with localStorage
- Protecting the page from unsafe user input
- Responsive design with Flexbox and media queries

## Author

**Nikhil**

## Disclaimer

MediTrack is a reminder tool only. It does not give medical advice. Always follow your doctor's instructions.
