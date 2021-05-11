import React, { Component } from 'react'
import { Form, Button, Card, ListGroup } from 'react-bootstrap'
import Calendar from 'react-calendar'
import data from './data.json'

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            primaryColor: '#1e81b0',
            isCalendarShow: 'none',
            searchCountForFrom: 0,
            searchCountForTo: 0,
            searchValueForFrom: '',
            searchValueForTo: '',
            selectedFiveForFrom: [],
            fromLocationCity: '',
            heightForFrom: '0%',
            isFromCardShow: 'none',
            selectedFiveForTo: [],
            toLocationCity: '',
            heightForTo: '0%',
            isToCardShow: 'none',
            toggleThis: true,
            flexThis: 0.5,
            flexDisplay: 'none',
            fromPlaceHolder: 'From',
            toPlaceHolder: 'To',
            datePlaceHolder: 'Date',
        }
    }

    getCurrentDate = () => {
        let date = new Date()
        let sDate = date.getDate()
        if ( sDate < 10 ) {
            sDate = '0' + sDate
        } 
        let sMonth = date.getMonth() + 1
        if ( sMonth < 10 ) {
            sMonth = '0' + sMonth
        }
        let sYear = date.getFullYear()
        let Day = Date().toLocaleString()
        let sDay = ''
        Day = Day.split(" ")
        switch(Day[0]) {
            case 'Sun': sDay = 'Sunday'
            break
            case 'Mon': sDay = 'Monday'
            break
            case 'Tue': sDay = 'Tuesday'
            break
            case 'Wed': sDay = 'Wednesday'
            break
            case 'Thu': sDay = 'Thursday'
            break
            case 'Fri': sDay = 'Friday'
            break
            case 'Sat': sDay = 'Saturday'
            break
            default: sDay = 'Sunday'
        }
        return sDate + '-' + sMonth + '-' + sYear + ', ' + sDay
    }

    calendarShow = () => {
        if ( this.state.isCalendarShow === 'flex' ) {
            this.setState({ isCalendarShow: 'none' })
        }
        else if ( this.state.isCalendarShow === 'none' ) {
            this.setState({ isCalendarShow: 'flex' })
        }
    }

    dateSelect = (value, event) => {
        let sentence = value.toString()
        let arr = sentence.split(" ")
        let sDate = arr[2]
        let sMonth = '' 
        switch(arr[1]) {
            case 'Jan': sMonth = '01'
            break
            case 'Feb': sMonth = '02'
            break
            case 'Mar': sMonth = '03'
            break
            case 'Apr': sMonth = '04'
            break
            case 'May': sMonth = '05'
            break
            case 'Jun': sMonth = '06'
            break
            case 'Jul': sMonth = '07'
            break
            case 'Aug': sMonth = '08'
            break
            case 'Sep': sMonth = '09'
            break
            case 'Oct': sMonth = '10'
            break
            case 'Nov': sMonth = '11'
            break
            case 'Dec': sMonth = '12'
            break
            default: sMonth = '01'
        }
        let sYear = new Date().getFullYear()
        let sDay = ''
        switch(arr[0]) {
            case 'Sun': sDay = 'Sunday'
            break
            case 'Mon': sDay = 'Monday'
            break
            case 'Tue': sDay = 'Tuesday'
            break
            case 'Wed': sDay = 'Wednesday'
            break
            case 'Thu': sDay = 'Thursday'
            break
            case 'Fri': sDay = 'Friday'
            break
            case 'Sat': sDay = 'Saturday'
            break
            default: sDay = 'Sunday'
        }
        this.setState({ selectedDate: sDate + '-' + sMonth + '-' + sYear+ ', ' + sDay })
        this.setState({ isCalendarShow: 'none' })
    }

    fromOnChange = (event) => {

        this.state.selectedFiveForTo = []
        this.state.isToCardShow = 'none'
        this.forceUpdate()

       if ( event.target.value !== '' ) {

            if ( this.state.searchValueForFrom !== event.target.value ) {
                this.state.searchValueForFrom = event.target.value
                this.state.fromLocationCity = event.target.value
                this.state.searchCountForFrom = 0
                this.state.selectedFiveForFrom = []
                this.state.isFromCardShow = 'none'
                this.forceUpdate()
                this.fetchHeightForFrom()
                data.data.map(
                    data => (
                        this.searchDataForFrom( data.city.toLowerCase(), event.target.value.toLowerCase(), data.city, data.state )
                    )
                )
            }


       }
       else {
            this.state.fromLocationCity = event.target.value
            this.state.selectedFiveForFrom = []
            this.state.isFromCardShow = 'none'
            this.forceUpdate()
       }
        
        
    }

    toOnChange = (event) => {

        this.state.selectedFiveForFrom = []
        this.state.isFromCardShow = 'none'
        this.forceUpdate()

        if ( event.target.value !== '' ) {
 
             if ( this.state.searchValueForTo !== event.target.value ) {
                 this.state.searchValueForTo = event.target.value
                 this.state.toLocationCity = event.target.value
                 this.state.searchCountForTo = 0
                 this.state.selectedFiveForTo = []
                 this.state.isToCardShow = 'none'
                 this.forceUpdate()
                 this.fetchHeightForTo()
                 data.data.map(
                     data => (
                         this.searchDataForTo( data.city.toLowerCase(), event.target.value.toLowerCase(), data.city, data.state )
                     )
                 )
             }
 
        }
        else {
             this.state.toLocationCity = event.target.value
             this.state.selectedFiveForTo = []
             this.state.isToCardShow = 'none'
             this.forceUpdate()
        }
         
         
     }

    searchDataForFrom = ( searchFrom, searchFor, city, state ) => {
        if( searchFrom.indexOf(searchFor) >=0 && this.state.searchCountForFrom < 5 ) {
            this.state.isFromCardShow = 'flex'
            this.state.searchCountForFrom =  this.state.searchCountForFrom + 1
            if( this.state.toLocationCity !== city ) {
                this.state.selectedFiveForFrom[this.state.searchCountForFrom] = city + ', ' + state
            }
            else {
                this.state.isFromCardShow = 'none'
            }
            this.forceUpdate()
        }
    }

    searchDataForTo = ( searchFrom, searchFor, city, state ) => {
        if( searchFrom.indexOf(searchFor) >=0 && this.state.searchCountForTo < 5 ) {
            this.state.isToCardShow = 'flex'
            this.state.searchCountForTo =  this.state.searchCountForTo + 1
            if( this.state.fromLocationCity !== city ) {
                this.state.selectedFiveForTo[this.state.searchCountForTo] = city + ', ' + state
            }
            else {
                this.state.isToCardShow = 'none'
            }
            this.forceUpdate()
        }
    }

    fixFrom = (data) => {
        let splitData = data.split(',')
        this.setState({ fromLocationCity: splitData[0] })
        this.setState({ selectedFiveForFrom: [] })
        this.setState({ isFromCardShow: 'none' })
    }

    fixTo = (data) => {
        let splitData = data.split(',')
        this.setState({ toLocationCity: splitData[0] })
        this.setState({ selectedFiveForTo: [] })
        this.setState({ isToCardShow: 'none' })
    }

    fetchHeightForFrom = () => {
        if ( this.state.fromLocationCity === '' ) {
            this.setState({ heightForFrom: this.state.selectedFiveForFrom.length * 10 + '%' }) 
        }
        else {
            this.setState({ heightForFrom: '0%' }) 
        }
    }

    fetchHeightForTo = () => {
        if ( this.state.toLocationCity === '' ) {
            this.setState({ heightForTo: this.state.selectedFiveForTo.length * 10 + '%' }) 
        }
        else {
            this.setState({ heightForTo: '0%' }) 
        }
    }

    toggleScaleUp() {
        this.setState({
            flexThis: 0.75,
            flexDisplay: 'flex',
            toggleThis: false,
            fromPlaceHolder: '',
            toPlaceHolder: '',
            datePlaceHolder: '',
        })
    }

    toggleScaleDown() {
        this.setState({
            flexThis: 0.5,
            flexDisplay: 'none',
            toggleThis: true,
            fromPlaceHolder: 'From',
            toPlaceHolder: 'To',
            datePlaceHolder: 'Date',
        })
    }

    render() {
        return(

            <div style = {{
                backgroundColor: '', 
                height: '100%', width: '100%', position: 'fixed', display: 'flex', flexDirection: 'column',
              }}
              >
               
            <div style = {{
                backgroundColor: '',
                display: 'flex', flex: 1,
            }}
            onClick = {() => this.toggleScaleDown()}
            >

            </div>

            <div style = {{
                backgroundColor: '', color: this.state.primaryColor,
                display: 'flex', flex: 1,alignItems: 'center', justifyContent: 'center', fontSize: '400%'
            }}
            onClick = {() => this.toggleScaleDown()}
            >
            blueBUS.com
            </div>

            <div style = {{
                backgroundColor: '', transition: 'all 0.5s ease-out',
                display: 'flex', flex: this.state.flexThis, flexDirection: 'row'
            }}
            >

                <div style = {{
                    backgroundColor: this.state.primaryColor,
                    display: 'flex', flex: 1,
                }} >

                </div>

                <div style = {{
                    backgroundColor: this.state.primaryColor,
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'left', flexDirection: 'column'
                }} >

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1, color: 'white', backgroundColor: '', width: '57%', alignItems: 'center', fontSize: '130%', fontFamily: 'sans-serif'
                    }} >
                        From
                    </div>

                    <div style = {{ 
                        display: 'flex', flex: 1, alignItems: 'center'
                    }} >
                    <Form
                    onClick = {() => this.toggleScaleUp()}
                    >
                        <Form.Group>
                            <Form.Control
                            type = 'text' size = 'lg'
                            placeholder = {this.state.fromPlaceHolder}
                            value = {this.state.fromLocationCity}
                            onChange = {(event) => this.fromOnChange(event)}
                            />
                        </Form.Group>
                    </Form>
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                </div>

                <div style = {{
                    backgroundColor: this.state.primaryColor,
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }} >
                    
                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1, color: 'white', backgroundColor: '', width: '57%', alignItems: 'center', fontSize: '130%', fontFamily: 'sans-serif'
                    }} >
                        To
                    </div>

                    <div>
                    <Form
                    onClick = {() => this.toggleScaleUp()}
                    >
                        <Form.Group>
                            <Form.Control
                            type = 'text' size = 'lg'
                            placeholder = {this.state.toPlaceHolder}
                            value = {this.state.toLocationCity}
                            onChange = {(event) => this.toOnChange(event)}
                            />
                        </Form.Group>
                    </Form>
                    </div>
                    

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                </div>

                <div style = {{
                    backgroundColor: this.state.primaryColor,
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }} >

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1, color: 'white', backgroundColor: '', width: '57%', alignItems: 'center', fontSize: '130%', fontFamily: 'sans-serif'
                    }} >
                        Date
                    </div>

                    <div 
                    onClick = {() => this.calendarShow()}
                    >
                    <Form
                    onClick = {() => this.toggleScaleUp()}
                    >
                        <Form.Group>
                            <Form.Control
                            type = 'text' 
                            size = 'lg'
                            placeholder = {this.state.datePlaceHolder}
                            value = { this.state.selectedDate } 
                            style = {{ pointerEvents: 'none' }}
                            />
                        </Form.Group>
                    </Form>
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'left', flexDirection: 'column'
                }} >

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                    <div style = {{ 
                        display: 'flex', flex: 1, alignItems: 'center', backgroundColor: '', width: '70%'
                    }} >
                    
                    <div>
                    <Button 
                    variant="danger"
                    >
                        Search Buses
                    </Button>
                    </div>                         

                    </div>

                    <div style = {{ 
                        display: this.state.flexDisplay, flex: 1,
                    }} >
                        
                    </div>

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1,
                }} >

                </div>

            </div>

            <div style = {{
                backgroundColor: '',
                display: 'flex', flex: 2,
            }}
            onClick = { this.state.isFromCardShow === 'none' && this.state.isToCardShow === 'none' && this.state.isCalendarShow === 'none' ? () => this.toggleScaleDown() : () => this.toggleScaleUp() }
            >

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1,
                }} >

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column'
                }} >

                    <div style = {{
                        backgroundColor: '', display: 'flex', flex: 1
                    }} >
                    </div>

                    <div style = {{
                        backgroundColor: '', display: 'flex', flex: 19, justifyContent: 'center'
                    }} >
                        <Card style={{ display: this.state.isFromCardShow , width: '80%', height: this.state.selectedFiveForFrom.length * 10 + '%' , justifyContent: 'center' }}>
                        <ListGroup variant="flush">
                            {
                                this.state.selectedFiveForFrom.map(
                                    data => (
                                        <ListGroup.Item
                                        style = {{ cursor: 'pointer', flex: 1, display: 'flex' }}
                                        onClick = {() => this.fixFrom(data)}
                                        >{data}</ListGroup.Item>
                                    )
                                )
                            }
                        </ListGroup>
                        </Card>
                    </div>

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column'
                }} >

                    <div style = {{
                        backgroundColor: '', display: 'flex', flex: 1
                    }} >
                    </div>

                    <div style = {{
                        backgroundColor: '', display: 'flex', flex: 19, justifyContent: 'center'
                    }} >
                        <Card style={{ display: this.state.isToCardShow , width: '80%', height: this.state.selectedFiveForTo.length * 10 + '%' , justifyContent: 'center' }}>
                        <ListGroup variant="flush">
                            {
                                this.state.selectedFiveForTo.map(
                                    data => (
                                        <ListGroup.Item
                                        style = {{ cursor: 'pointer', flex: 1, display: 'flex' }}
                                        onClick = {() => this.fixTo(data)}
                                        >{data}</ListGroup.Item>
                                    )
                                )
                            }
                        </ListGroup>
                        </Card>
                    </div>

                    

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'
                }} >

                    <div style = {{
                        display: this.state.isCalendarShow
                    }}>
                    <Calendar
                    maxDate = { new Date(new Date().getFullYear(), 11, 31) }
                    minDate = { new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) }
                    onChange = {(value, event) => this.dateSelect(value)}
                    />
                    </div>

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1,
                }} >

                </div>

                <div style = {{
                    backgroundColor: '',
                    display: 'flex', flex: 1,
                }} >

                </div>

            </div>

            <div style = {{
                backgroundColor: '',
                display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-start'
            }}
            onClick = {() => this.toggleScaleDown()}
            >


            </div>

            </div>

        )
    }

}

export default LandingPage;