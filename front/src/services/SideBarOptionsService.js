class SideBarOptionsService {
    optionsHomeBar = [
        {
            "icon": "house",
            "name": "Home",
            "roles": ["Super Admin", "Cliente"],
            "path": "/home"
        },
        {
            "icon": "ticket-perforated",
            "name": "Cupones",
            "roles": ["Super Admin"],
            "path": "/cupones"
        },
        {
            "icon": "tag-fill",
            "name": "Beneficios",
            "roles": ["Super Admin"," Cliente"],
            "path": "/beneficios"
        },
        {
            "icon": "people",
            "name": "Usuarios",
            "roles": ["Super Admin"],
            "path": "/usuarios"
        },
        {
            "icon": "gift",
            "name": "Canjear Cupón",
            "roles": ["Super Admin", "Cliente"],
            "path": "/canje"
        }
    ]

    loadHomeBarOptionsBasedOnRole(roles) {
        if (!roles || (Array.isArray(roles) && roles.length === 0)) {
            return [];
        }
        if (Array.isArray(roles)) {
            return this.optionsHomeBar.filter(option => {
                return option.roles.some(role => roles.includes(role));
            });
        }
        else if (typeof roles === 'string') {
            return this.optionsHomeBar.filter(option => {
                return option.roles.includes(roles);
            });
        }

        return [];
    }

    getOptions(roles) {
        return this.loadHomeBarOptionsBasedOnRole(roles);
    }
}

export default new SideBarOptionsService();