/**
    * AppFooter is a function that returns a React component that renders the footer of the app. 
    * The footer contains some information about the app, such as the version, the developer, and the license. 
    * The function takes no parameters and returns a JSX element. 
*/
const AppFooter = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright © 2023. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default AppFooter;