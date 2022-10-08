import DogLoading from 'assets/gif/dog.gif'
import { useSelector } from 'react-redux'
import { selectLoading } from 'redux/features/loading/LoadingSelectors'
import './Loading.css'

const Loading = () => {
    const isLoading = useSelector(selectLoading)
    const loadingClassName = isLoading ? "loading-component show" : "loading-component"
    return(
        <div className={loadingClassName}>
            <img alt="Loading" src={DogLoading}/>
        </div>
    )
}

export default Loading