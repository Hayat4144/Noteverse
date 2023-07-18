# Noteverse
Noteverse is a versatile and intuitive note-taking application designed to simplify and enhance your digital note-taking experience. With Noteverse, you can effortlessly capture and organize your ideas, thoughts, and important information in a seamless and efficient manner.

Whether you're a student, professional, or creative individual, Noteverse offers a wide range of features to meet your note-taking needs. Create rich and visually appealing notes with the ability to format text, add images, tables, and lists. Stay organized by categorizing your notes into different notebooks and easily navigate through your collection with a user-friendly interface.

Collaboration is made easy with Noteverse's sharing capabilities, allowing you to collaborate on notes with colleagues, friends, or study groups. Stay connected and productive by seamlessly synchronizing your notes across multiple devices, ensuring that your important information is accessible whenever and wherever you need it.

Noteverse prioritizes your privacy and data security, providing robust encryption and backup options to keep your notes safe and protected. Enjoy a clutter-free and distraction-free writing environment, allowing you to focus solely on your ideas and creativity.

Experience the power and convenience of Noteverse as it empowers you to capture, organize, and unleash your thoughts and ideas with ease. Whether you're a student, professional, or creative enthusiast, Noteverse is the ultimate companion for your note-taking journey.

Resource to build this application  
https://docs.guidewire.com/cloud/pc/202302/cloudapibf/cloudAPI/topics/101-Fund/03-query-parameters/c_the-filter-query-parameter.html


https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/

https://www.taniarascia.com/rest-api-sorting-filtering-pagination/#filtering


url formats for filtering 
eq 	Equal to 	?filter=escalated:eq:true 	...​the escalated field equals true
ne 	Not equal to 	?filter=escalated:ne:true 	...​the escalated field equals false
lt 	Less than 	?filter=dueDate:lt:2020-05-11T07::00::00.​000Z 	...​the due date is less than (before) May 11, 2020.
gt 	Greater than 	?filter=dueDate:gt:2020-05-11T07::00::00.​000Z 	...​the due date is greater than (after) May 11, 2020.
le 	Less than or equal 	?filter=dueDate:le:2020-05-11T07::00::00.​000Z 	...​the due date is less than or equal to (on or before) May 11, 2020.
ge 	Greater than or equal 	?filter=dueDate:ge:2020-05-11T07::00::00.​000Z 	...​the due date is greater than or equal to (on or after) May 11, 2020.
in 	In 	?filter=priority:in:urgent,high 	...​the priority is either urgent or high
ni 	Not in 	?filter=priority:ni:urgent,high 	...​the priority is neither urgent nor high
sw 	Starts with 	?filter=subject:sw:Contact%20claimant 	...​the subject starts with the string "Contact claimant"
cn 	Contains 	?filter=subject:cn:Contact%20claimant 	...​the subject contains the string "Contact claimant"



The query parameter is passed as part of a URL. Therefore, special conventions must be used for certain types of characters to ensure the URL can be parsed correctly.

    Specify strings without surrounding quotes.
    If a string has a space in it, use the URL encoding for a space (%20). (For example, "subject starts with 'Contact claimant'" is specified as filter=subject:sw:Contact%20claimant)
    If a string has a colon (:) in it, use two colons (::) in the URL. The first colon acts as an escape character. (For example, "subject starts with 'Urgent: Information needed'" is specified as ?filter=subject:sw:Urgent::%20Information%20needed)
    Specify Booleans as either true or false. (For example, "escalated is true" is specified as ?filter=escalated:eq:true)
    Date and datetime fields must be specified as an ISO-8601 datetime value. All datetime fields can accept either date values or datetime values. For datetime values, the colons in the value must be expressed as "::". For example, "due date is less than 2020-04-03T15:00:00.000Z" is specified as ?filter=dueDate:lt:2020-05-11T07::00::00.000Z.
    Specify null values as null. For example, "all activities whose escalation date is null" is specified as ?filter=escalationDate:eq:null.

References to typekey fields automatically resolve to the field's code. For example, to filter on activities whose priority is set to urgent, use: GET /activities?filter=priority:eq:urgent.