import React , { Component,createContext } from 'react';
import { ContextParams } from '../../types'
import { getColor } from '../utils/getColor';
import { uuid } from '../utils/uuid';

const StoreContext = createContext<ContextParams>({});

class StoreProvider extends Component{
    constructor(props:any){
        super(props)
        this.state = {
            theme:'light',
            user:null,
            todos:[
                {
                    id: uuid(),
                    title:"Firebase",
                    remaining:1,
                    completed:2,
                    tasks:[
                        { id:getColor(),isCompleted:true,description:'Project Setup' },
                        { id:getColor(),isCompleted:true,description:'Authentication' },
                        { id:getColor(),isCompleted:false,description:'Firestore Setup' }
                    ],
                    color: getColor()
                },
                {
                    id: uuid(),
                    title:"Aws",
                    remaining:1,
                    completed:1,
                    tasks:[
                        { id:getColor(),isCompleted:true,description:'Redis Setup' },
                        { id:getColor(),isCompleted:false,description:'Optimization' }
                    ],
                    color: getColor()
                },
                {
                    id: uuid(),
                    title:"SQL-lite",
                    remaining:2,
                    completed:1,
                    tasks:[
                        { id:getColor(),isCompleted:true, description: 'SQL Setup' },
                        { id:getColor(),isCompleted:false, description: 'Relation' },
                        { id:getColor(),isCompleted:false, description: 'Graphic Search' }
                    ],
                    color: getColor()
                },
            ]
        }
    }
    
    handlerContext = (key:string,value:string|object) => {
        this.setState({ [key] : value });
    }

    render(){
        return(
            <StoreContext.Provider 
                    value = {{
                        ...this.state,
                        handlerContext: this.handlerContext,
                    }}
                >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
} 

export { StoreContext,StoreProvider }
