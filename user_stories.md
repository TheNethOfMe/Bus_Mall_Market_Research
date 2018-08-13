# User Stories

## As a user
* Users should be able to view three random images and click one of them to vote on it.
* Users should note be shown the same image per set nor should they see the same image from the set immediately before to ensure they are shown a variety of images.
* After 25 votes, the user should be shown the results of his or her voting so they can see what items they voted for the most.

## Developer preliminary notes
* The images should display uniformly to prevent potential bias. 
* The results should be hidden until the user has voted 25 times. (Append result to the DOM, replacing instructions)
* The voting should stop after 25 votes. 