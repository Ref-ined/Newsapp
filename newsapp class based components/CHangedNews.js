import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country: 'in',
        pageSize:6,
        category:"general"
    }

    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,     

    }

    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    constructor(props){
        super(props);
        // console.log("Hello I am a constructor from News Component");
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
        document.title= `${this.capitalizeFirstLetter(this.props.category)} - Samachar Baba`;
    }

    async updateNews(){
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6494ab95c62542c7a0eb808de125d71b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});

        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
                        totalResults:parsedData.totalResults,
                        loading:false
                });
    }

    async componentDidMount(){
        // console.log("cdm")
        // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6494ab95c62542c7a0eb808de125d71b&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});

        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, 
        //                 totalResults:parsedData.totalResults,
        //                 loading:false
        //         });
        // console.log("ini "+url);  

        this.updateNews();
    }

    handlePrevClick= async ()=>{
        // console.log("Previous");
        // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6494ab95c62542c7a0eb808de125d71b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});

        // let data= await fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);

        // this.setState({
        //     page:this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false

        // })
        // console.log("prev "+url)       
        this.setState({page:this.state.page-1});
        this.updateNews();
    }   
    
    handleNextClick= async ()=>{
        // console.log("Next") ;
        
        // if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            
        //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6494ab95c62542c7a0eb808de125d71b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data= await fetch(url);
        //     let parsedData= await data.json();

        //     // console.log(parsedData);
            
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading:false
                
        //     })
        //     console.log("next "+url)       
        // }
        this.setState({page:this.state.page+1});
        this.updateNews();
        
    }

    render() {
        // console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin:'40px 0px'}}>Samachar Baba - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner /> }
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url} >
                        <NewsItem title={element.title ? element.title : ""}  description={element.description ? element.description: ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div> 
                })}

                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
