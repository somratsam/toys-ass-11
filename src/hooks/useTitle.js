import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {document.title = `${title} - Wonder Toy`;
    }, [title])
}

export default useTitle;