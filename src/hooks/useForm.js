//  A simple custom form hook for managing multiple field inputs. Just for reference.
import { useState } from "react";

export const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  return {
    state,
    handleChange: (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    },
    reset: () => setState(initialState)
  };
};

//Example:

// import { useForm } from "./useForm";

// export default function SignInForm() {
//   const { state, handleChange, reset } = useForm({
//     username: "",
//     password: "",
//     Beijing: false,
//     Sydney: false,
//     Toronto: false
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="username"
//         placeholder="Enter your username..."
//         value={state.username}
//         onChange={handleChange}
//       />
//       <br />
//       <input
//         type="password"
//         name="password"
//         placeholder="Enter your password..."
//         value={state.password}
//         onChange={handleChange}
//       />
//       <br />
//       <label>
//         <input
//           type="checkbox"
//           name="Beijing"
//           checked={state.Beijing}
//           onChange={handleChange}
//           value={state.Beijing}
//         />
//         Beijing
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           name="Sydney"
//           checked={state.Sydney}
//           onChange={handleChange}
//           value={state.Sydney}
//         />
//         Sydney
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           name="Toronto"
//           checked={state.Toronto}
//           onChange={handleChange}
//           value={state.Toronto}
//         />
//         Toronto
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//       <button type="button" onClick={reset}>
//         Reset
//       </button>
//     </form>
//   );
// }

