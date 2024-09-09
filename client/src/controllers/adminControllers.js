import { URL } from "../data";

export const getProducts = async ({ page, category, newPrice, limit, title }) => {
    console.log(newPrice)
    const res = await fetch(`${URL}/api/admin/products?title=${title}&page=${page}&limit=${limit}&category=${category}&newPrice[lte]=${newPrice}`)
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}


export const getProduct = async (id) => {
    const res = await fetch(`${URL}/api/admin/product/${id}`)
    const data = res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

export const newProduct = async ({ pName, sDesc, buyPrice, oldPrice, newPrice, category, imgs, sizes, colors }) => {
    if (!pName  || !sDesc || !newPrice || !category || !imgs || !sizes || !colors) {
        throw Error("All fields are required")
    }
    const info = JSON.stringify({ pName, sDesc, buyPrice, oldPrice, newPrice, category, imgs, sizes, colors })
    const res = await fetch(`${URL}/api/admin/newproduct`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

export const updateProduct = async ({ pName, sDesc, buyPrice, oldPrice, newPrice, category, imgs, sizes, colors, id }) => {
    if (!pName  || !sDesc || !newPrice || !category || !imgs || !sizes || !colors) {
        throw Error("All fields are required")
    }
    const info = JSON.stringify({ pName, sDesc, buyPrice, oldPrice, newPrice, category, imgs, sizes, colors })
    const res = await fetch(`${URL}/api/admin/product/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

export const newOrder = async ({ totalPrice, cart, billingInfo }) => {
    cart.forEach(item => {
        delete item._id;
        delete item.sDesc; delete item.colors;
        delete item.sizes; delete item.categories;
        delete item.__v; delete item.updatedAt;
        delete item.createdAt;
    });
    const info = JSON.stringify({ totalPrice, cart, billingInfo })
    const res = await fetch(`${URL}/api/orders/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
}

export const delOrder = async (id) => {
    const res = await fetch(`${URL}/api/orders/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
}