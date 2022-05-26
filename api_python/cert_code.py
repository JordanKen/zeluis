from datetime import datetime, timedelta
from time import time
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

def cert(h_name,h_CA,key,name0,name1,alt_names,basic_contraints,now,cert,my_cert_pem,my_key_pem):
    server_IP = ''
    h_name = 'AREA ASSURANCES'
    h_CA= 'BLUE CERT'

    key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend(),
    )

    name0= x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, h_name)
    ]   )
    name1= x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, h_CA)
    ]   )

    alt_names= [ x509.DNSName(h_name)]
    alt_names.append(x509.DNSName(server_IP))

    basic_contraints = x509.BasicConstraints(ca=True, path_length=0)
    now = datetime.utcnow()
    cert = (
        x509.CertificateBuilder()
            .subject_name(name0)
            .issuer_name(name1)
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

    with open('certificate0.crt', 'wb') as c:
        c.write(my_cert_pem)

    with open('private0.key', 'wb') as c:
        c.write(my_key_pem)

        return { my_cert_pem, my_key_pem }