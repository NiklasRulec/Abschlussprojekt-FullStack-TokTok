const user = [
  {
    // U S E R M O D E L -> DIES IST EINE COLLECTION "users"
    // -> DAS SIND DIE DATEN DES USERS
    // ---------------------------------------------------------------------------------------------------------------------------------------
    name: "",
    email: "",
    salt: "",
    hash: "",
    profession: "",
    description: "",
    domain: "",
    amountOfPosts: "", // fake
    amountOfFollowers: "", // fake
    amountOfFollowing: "", // fake
    image: {
      // profilbild // *** siehe Anmerkung 1 ***
      url: "",
      imageId: "",
    },
    gallery: [
      {
        // fake gallery
        url: "",
        imageId: "",
      },
    ],
    isLiking: [], // which Posts is the User liking? -> Array of ObjectIds
    isFollowing: [], // which other User Accounts is the User following? -> Array of ObjectIds
    posts: [
      {
        // P O S T M O D E L (über ObjectId mit dem UserModel verbunden) -> DIES IST EINE EIGENE COLLECTION "posts"
        // -> DAS SIND DIE EIGENEN POSTS DES USERS
        // ---------------------------------------------------------------------------------------------------------------------------------------
        caption: "",
        image: {
          // bild vom post
          url: "",
          imageId: "",
        },
        location: "",
        facebook: "",
        twitter: "",
        tumblr: "",
        time: "", // fake
        amountOfLikes: "", // fake
        amountOfComments: "", // fake
        comments: [
          // *** siehe Anmerkung 2 ***
          {
            // C O M M E N T M O D E L (über ObjectId mit dem PostModel verbunden) -> DIES IST EINE EIGENE COLLECTION "comments"
            // -> DAS SIND KOMMENTARE VON ALLEN MÖGLICHEN ANDEREN USERN
            // ------------------------------------------------------------------------------------------------------------------------------------
            user: "", // welcher andere User hat bei dem eingeloggten User kommentiert? Verlinkung über ObjectId
            comment: "",
            time: "", // fake
            amountOfLikes: "", // fake
          },
        ],
      },
    ],
  },
];

// * 1 *
// das Profilbild des Users wird über die PUT Route hinzugefügt und/oder aktualisiert
// siehe routes.js unter:
// upload & edit profile pic of logged in user ------------------------------------------------------------------
// userRouter.put("/profile/img",...
// es wird automatisch geprüft ob bereits ein profilbild vorhanden ist
// falls nein, wird ein neues erstellt
// falls ja, wird das alte ersetzt
// im frontend mit formData arbeiten !
const formData = new FormData(e.target);
const { data1 } = await axios.put("/api/user/profile/img", formData);

// alle anderen Infos des Users werden über folgende PUT Route aktualisiert
// siehe routes.js unter:
// update profile infos of logged in user -----------------------------------------------------------------------
// userRouter.put("/profile",...
// im frontend NICHT mit formData arbeiten ! -> z.b. useRef oder e.target...
const newName = { name: nameRef.current.value };
const { data2 } = await axios.put("/api/user/profile", newName);

// * 2 *
// Kommentare zu einem bestimmten Post hinzufügen:
// siehe PostRoutes.js unter:
// update post by id -> add comments -----------------------------------------------------------------------------
// postRouter.put("/:id",...
// man darf nicht das bild oder den inhalt von einem Post updaten -> diese route ist NUR dafür da, um Kommentare zu einem Post hinzuzufügen !
// jeder User darf Kommentare bei Posts von anderen Usern hinzufügen
// dafür muss zuerst ein Kommentar nach dem Comment Schema erstellt werden
// dann den Kommentar in den Post einfügen mit der objectId
// um einen Kommentar zu hinterlassen, muss der User seine id ans Backend durchgeben!
// FRONTEND KOMMENTAR ERSTELLEN:
// folgende Daten müssen ans Backend gereicht werden:
// user: (mongoose.Types.ObjectId) // die ID vom eingeloggten User
// comment: ""
// time: // mit new Date generieren ---> dann nochmal im Model umändern auf type: Date ???
// amountOfLikes: // default 0

// Beispiel User:
// wenn der User im Frontend über axios geholt wird, kann man auch direkt auf die dazugehörigen Posts zugreifen

// {
//     "_id": "64db5f9ee7e3e2ea15b598f2",
//     "name": "test man",
//     "email": "test@test.de",
//     "posts": [
//       {
//         "_id": "64db3faf4c92353231ce19a7",
//         "caption": "dghb",
//         "image": {
//           "url": "https://res.cloudinary.com/dryqtwdls/image/upload/v1692090287/Hausinventar/dzzgbq7h3j9k77xmlimf.jpg",
//           "imageId": "Hausinventar/dzzgbq7h3j9k77xmlimf",
//           "_id": "64db3faf4c92353231ce19a8"
//         },
//         "comments": [
//           "64db75c6ac9a0a4edd95d17a",
//           "64db764aac9a0a4edd95d17e"
//         ],
//         "__v": 2
//       }
//     ],
//     "gallery": [],
//     "__v": 0,
//     "image": {
//       "url": "https://res.cloudinary.com/dryqtwdls/image/upload/v1692103591/TokTok_Users/rqvnuy5wsrkdr3xyj6jb.png",
//       "imageId": "TokTok_Users/rqvnuy5wsrkdr3xyj6jb",
//       "_id": "64db73a8fefb9b99ab8d0795"
//     }
// }

// Beispiel Post
// wenn der Post im Frontend über axios geholt wird, kann man auch direkt auf die dazugehörigen Kommentare zugreifen

// {
//     "_id": "64db3faf4c92353231ce19a7",
//     "caption": "dghb",
//     "image": {
//       "url": "https://res.cloudinary.com/dryqtwdls/image/upload/v1692090287/Hausinventar/dzzgbq7h3j9k77xmlimf.jpg",
//       "imageId": "Hausinventar/dzzgbq7h3j9k77xmlimf",
//       "_id": "64db3faf4c92353231ce19a8"
//     },
//     "comments": [
//       {
//         "_id": "64db75c6ac9a0a4edd95d17a",
//         "user": "64db6aaeb61ab3ee7ff5e335",
//         "comment": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla ipsum provident asperiores!",
//         "time": "3 hours ago",
//         "amountOfLikes": 45,
//         "__v": 0
//       },
//       {
//         "_id": "64db764aac9a0a4edd95d17e",
//         "user": "64db6aaeb61ab3ee7ff5e335",
//         "comment": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla ipsum provident asperiores!",
//         "time": "3 hours ago",
//         "amountOfLikes": 56,
//         "__v": 0
//       }
//     ],
//     "__v": 2
// }
