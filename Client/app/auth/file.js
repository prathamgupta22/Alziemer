// Handle login function
// const handleLogin = async () => {
//   try {
//     const response = await axios.post("YOUR_API_ENDPOINT/login", {
//       email,
//       password,
//     });

//     if (response.data.success) {
//       const { role } = response.data.user;
//       switch (role) {
//         case "caretaker":
//           navigation.navigate("CaretakerHome");
//           break;
//         case "patient":
//           navigation.navigate("PatientHome");
//           break;
//         case "admin":
//           navigation.navigate("AdminHome");
//           break;
//         default:
//           navigation.navigate("Home");
//           break;
//       }
//     } else {
//       Alert.alert("Error", response.data.message);
//     }
//   } catch (error) {
//     Alert.alert("Error", "An error occurred. Please try again.");
//   }
// };
// // State for email and password
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
