const prm = new Promise(() => {
  throw ("Error");
});

while(true) {

  prm.then(() => {
    console.log("Resolved");
    // throw ("Error");
  })
  .catch((err) => {
    console.log(err);
  });
}