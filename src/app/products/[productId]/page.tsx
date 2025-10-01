import Image from "next/image";

async function getProductDetails(productId: string) {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    if(res.ok){
        return res.json();
    }
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
    const {productId} = params;
    const product = await getProductDetails(productId);
    if(!product){
        return <div>Product not found</div>
    }
    return (
        <div className="container mx-auto py-16">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8">
                    <Image src={product.imageUrl || 'https://placehold.co/600'} alt={product.name} className="max-h-96" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="mt-4 text-2xl text-gray-800">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    <p className="mt-6 text-gray-600">{product.description}</p>
                    
                </div>
            </div>
        </div>
    
    )
}
