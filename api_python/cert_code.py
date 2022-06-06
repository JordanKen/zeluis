from datetime import datetime, timedelta
from time import time
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import json

def cert(h_name):
    server_IP = ''
    h_name = 'MEGUI ENTREPRISE'
    h_CA= 'TAIGUS CERT'

    key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend(),
    )

    name= x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, h_name)
    ]   )

    alt_names= [ x509.DNSName(h_name)]
    alt_names.append(x509.DNSName(server_IP))

    basic_contraints = x509.BasicConstraints(ca=True, path_length=0)
    now = datetime.utcnow()
    cert = (
        x509.CertificateBuilder()
            .subject_name(name)
            .issuer_name(name)
            .public_key(key.public_key())
            .serial_number(1000)
            .not_valid_before(now)
            .not_valid_after(now + timedelta(minutes=1))
            .add_extension(basic_contraints, True)
            .add_extension(x509.SubjectAlternativeName(alt_names), False)
            .sign(key, hashes.SHA256(), default_backend())
    )

    my_cert_pem = cert.public_bytes(encoding=serialization.Encoding.PEM)
    my_key_pem = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption(),
    )

    with open('certificate.crt', 'wb') as c:
        c.write(my_cert_pem)

    with open('private.key', 'wb') as c:
        c.write(my_key_pem)
        result = {"my_cert_pem":my_cert_pem.decode('utf8'), "my_key_pem": my_key_pem.decode('utf8') }
        print(json.dumps(result))
        return json.dumps(result)
