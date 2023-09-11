import React from "react"
import ContentLoader from "react-content-loader"



export const Skeleton = () => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={495}
        viewBox="0 0 280 495"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="135" cy="123" r="120" />
        <rect x="0" y="257" rx="10" ry="10" width="280" height="15" />
        <rect x="0" y="287" rx="5" ry="5" width="280" height="88" />
        <rect x="0" y="397" rx="10" ry="10" width="105" height="27" />
        <rect x="176" y="392" rx="20" ry="20" width="105" height="45" />
    </ContentLoader>
)



