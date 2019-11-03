function check(form)
{
 
 if(form.userid.value == "Micke" && form.pswrd.value == "123")
  {
    window.open("../index.html")
  }
 else
 {
   alert("Användarnamnet och lösenordet stämmer inte överens!")
  }
}
