from extensions import db

class Tenant(db.Model):
    __tablename__ = 'tenants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    rent_amount = db.Column(db.Float, nullable=False)
    room_number = db.Column(db.String(20))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rent_amount': self.rent_amount,
            'room_number': self.room_number,
            'property_id': self.property_id
        }

class Landlord(db.Model):
    __tablename__ = 'landlords'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    properties = db.relationship('Property', backref='landlord', lazy=True)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'properties': [property.as_dict() for property in self.properties]
        }

class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    property_type = db.Column(db.String(50))
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlords.id'))
    tenants = db.relationship('Tenant', backref='property', lazy=True)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'property_type': self.property_type,
            'landlord_id': self.landlord_id,
            'tenants': [tenant.as_dict() for tenant in self.tenants]
        }
