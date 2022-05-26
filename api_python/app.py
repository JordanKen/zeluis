
from flask import Flask, request
  
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
  
import cert_code
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/post_json', methods=['POST'])
def post():
    return cert_code.cert(request.form["h_name"],request.form["h_CA"],request.form["key"],request.form["name0"],request.form["name0"],request.form["alt_names"],request.form["basic_contraints"],request.form["now"],request.form["cert"],request.form["my_cert_pem"],request.form["my_key_pem"])

@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'BLUE IT\'S BLUE'
  
# main driver function
if __name__ == '__main__':
  
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()