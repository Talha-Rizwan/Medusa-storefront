import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"


const Contact: NextPageWithLayout = () => {
    return (
        <>
      <Head title="Contact Us" description="Visit for queries" />

        <div className="flex flex-col md:flex-row md:justify-around">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  text-gray-800">
	<div className="mb-8 ">
		<h1 className="my-3 text-4xl font-bold">Contact Us</h1>
	</div>
	<form  action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div className="flex flex-row">
            <div className="mr-1">
				<label htmlFor="fullname" className="block mb-2 text-sm">Full Name</label>
				<input type="text" name="fullname" id="fullname" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>    
            
            <div>
				<label htmlFor="email" className="block mb-2 text-sm">Email </label>
				<input type="email" name="email" id="email" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
            </div>
			<div>
				<label htmlFor="phone" className="block mb-2 text-sm">Phone </label>
				<input type="text" name="phone" id="phone" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
            <div>
				<label htmlFor="message" className="block mb-2 text-sm">Message </label>
				<input type="textarea" name="message" id="message" placeholder="" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
				<button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-black text-gray-50">Send Message</button>	
		</div>
	</form>
</div>
            
            <div className="max-w-md p-6 rounded-md sm:p-10  text-gray-800">
                <h1 className="my-3 text-4xl font-bold">Our Location</h1>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14536.638209745795!2d54.508214!3d24.3757524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6805e10cff797931!2sDorbi%20Autocare!5e0!3m2!1sen!2s!4v1671040314264!5m2!1sen!2s" style={{padding:'10px 10px',border:0 }} width="100%" height="70%"  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
            </div>
        </div>
        </>
    )
}

Contact.getLayout = (page) => <Layout>{page}</Layout>  
export default Contact;

// width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
