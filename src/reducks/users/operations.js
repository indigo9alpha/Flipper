import { signInAction, signOutAction, newBookAction } from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, db } from "../../firebase/index";

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            uid: uid,
            updated_at: timestamp,
            username: username,
            books: [],
            pages: 0,
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                books: data.books,
                pages: data.pages,
              })
            );
            dispatch(push("/"));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("パスワードリセット用のメールが送信されました");
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました");
        });
    }
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                books: data.books,
                pages: data.pages,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const searchBook = (isbn) => {
  return async(dispatch,getState) => {

    fetch(
     `https://www.googleapis.com/books/v1/volumes?q=${isbn}&maxResults=1`,
     {}
   )
     .then((response) => {
       if (response.status === 200) {
         return response.json();
       } else {
         throw new Error("データの取得に失敗しました");
       }
     })
     .then((data) => {
       return {
         title: data.items[0].volumeInfo.title,
         pages: data.items[0].volumeInfo.pageCount,
         image: data.items[0].volumeInfo.imageLinks["thumbnail"],
       };
     })
     .then((book) => {
       console.log(book)
       const uid = getState().users.uid
       const pages = getState().users.pages
       const books = getState().users.books

       console.log("実行前のストア、pages: " + pages);
       console.log("実行前のストア、books: " + books);

       const newPages = pages + book['pages']
       books.push(book)
       

       console.log("newPages: " + newPages);
      
 
       dispatch(
         newBookAction({
           pages: newPages,
           books: books
         })
       );
 
       db.collection("users").doc(uid).update({
         pages: newPages,
         books: books
       });
     });
  }
};

export const setData = (searchBook) => {
  return async (dispatch, getState) => {
    searchBook().then((book) => {
      console.log(book);
    })
  };
};
