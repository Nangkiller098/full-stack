var username = "admin";
var Gender = "Male";
var Tel = "0098521122";
var Salary = 999.99;
var Age = 32;
console.log("Name= " + username);
console.log("Gender= " + Gender);
console.log("Tel= " + Tel);
console.log("Salery= " + Salary);
console.log("Age= " + Age);

if (Age < 30) {
  console.log("old age");
}
for (var i = 0; i < 10; i++) {
  console.log(i);
}

var course = ["C++", "C#", "test"];

console.log(course[0]);
console.log(course[1]);
console.log(course[2]);

for (var i = 0; i <= course.length; i++);
{
  console.log(course[i]);
}
function getUsername() {
  var dara = "dara";
  console.log(dara);
  return dara;
}
getUsername();
