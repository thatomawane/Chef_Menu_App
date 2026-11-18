# Chefs_Menu_App

The enhanced version includes three main app screens:
# Dashboard
- Displays the total number of menu items.
- Displays the average menu price.
- Uses summary cards to make the menu statistics easy to read.

# Manage Menu
- Displays the restaurant menu as individual cards.
- Includes a search field for finding menu items.
- Includes category filters (All, Starters, Mains, Desserts and Drinks).
- Shows each item's price and availability.
- Allows an item's availability to be toggled.
- Includes a delete action for menu items, with a confirmation prompt.
- Provides an Add new menu item action.

# Add Item
- Provides fields for the item name, description and price.
- Allows the user to select a course: Starter, Main Course, Dessert or Drink.
- Includes an Add Menu Item action.

  
## Project structure
The application was refactored from having most of its code in App.tsx into a multi-screen structure:
Chef_Menu_App/
├── App.tsx
└── src/
    ├── context/
    │   └── MenuContext.tsx
    ├── navigation/
    │   └── AppNavigator.tsx
    ├── screens/
    │   ├── DashboardScreen.tsx
    │   ├── MenuScreen.tsx
    │   └── AddMenuItemScreen.tsx
    └── types/
        └── MenuItem.ts
  
  
  ## Changelog
# Changes implemented since Part 2

- Dashboard overview: Added a dashboard showing the total menu item count and average menu price.
- Category filtering: Added category filter controls for viewing all items or a particular course.
- Availability control: Added an availability toggle to menu item cards.
- Delete menu items: Added a Delete action to menu item cards, including a confirmation prompt before deletion.
- Add menu item flow: Added a dedicated screen with fields for the item name, description and price, plus course selection.
- Menu item cards: Improved the menu list presentation so that item information, price, availability and delete action are grouped in clear cards.
- Bottom-tab navigation: The final interface provides Dashboard, Manage Menu and Add Item tabs.
- Visual refinement: Applied a consistent light background, white cards, rounded corners, blue highlights and orange action buttons, with clearer spacing and typography.
  
# Changes made during refactoring
- Separated screens: Moved the dashboard, menu list and add-item interfaces into their own screen files instead of keeping the application UI together in App.tsx.
- Added navigation structure: Created AppNavigator.tsx to manage movement between the Dashboard, Manage Menu and Add Item screens using bottom-tab navigation.
- Centralised menu state: Created MenuContext.tsx to hold the menu data and shared menu operations, so screens can access the same menu state.
- Added shared menu operations: The context defines operations for adding, updating, deleting and toggling the availability of menu items.
- Created a shared type: Added MenuItem.ts to define the structure of a menu item and its category type.
- Simplified the root component: App.tsx now acts as the application entry point, wrapping the navigator in MenuProvider and NavigationContainer.

# Design notes
The enhanced interface follows the visual direction of the Part 2 design:
- Light grey-blue screen backgrounds.
- White cards with rounded corners and subtle shadows.
- Blue for selected navigation and category controls, and dashboard statistics.
- Orange for prominent add-item actions.
- Green and red styling to distinguish availability and delete actions.

  # GitHub repository and Part 2 submission note
The Part 2 commits were made locally but were not pushed to the remote GitHub repository (origin). As a result, the Part 2 repository appeared online as though it contained no files. The submitted repository therefore did not show the Part 2 work, so I therefore created a new repo and worked on the project there


