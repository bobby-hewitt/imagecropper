import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cropper from 'cropperjs'
import $ from 'jquery'

class App extends Component {

  componentDidMount(){
    let self = this;
    document.getElementById("fileUpload").onchange = () => {
      console.log('uploaded')
        self.readURL(document.getElementById("fileUpload"))
    }
  }

  readURL(input) {
    const self = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log('result', e.target.result)
            $('#image').attr('src', e.target.result);
            self.getCropper()
        }
        console.log('input')
      reader.readAsDataURL(input.files[0]);
    }
  }

  getCropper(){
    var image = document.getElementById('image');
    var cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop: function(e) {
      
      }
    });
    this.setState({cropper})
  }

  onUploadImage(){
    let image = this.state.cropper.getCroppedCanvas().toDataURL('image/jpeg')
    console.log(image)
  }


  render() {
    return (
      <div className="App">
        <form action="/action_page.php">
          <input id="fileUpload" type="file" name="pic" accept="image/*" />
          <input type="submit" />
        </form>
        <div className="cropperContainer">
          <img id="image" src=""/>
        </div>
        <div className="button" onClick={this.onUploadImage.bind(this)}/>
      </div>
    );
  }
}

export default App;
