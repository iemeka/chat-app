export default function Message( {msg} ) {
  const { user, message } = msg ;
  return (
    <div>
      <span>{user} : </span> 
      <span>{message}</span>
    </div>
  )
}