import { useEffect }  from 'react'
import { usechat } from '../hook/usechat'
import { useSelector } from 'react-redux'






const Dashbord = () => {4
const chat = usechat()

const {user} = useSelector((state) => state.auth.user);


useEffect(() => {
  chat.initalizeSocketconnection(user);
},[])


  return (
    <div>
      
    </div>
  )
}

export default Dashbord
