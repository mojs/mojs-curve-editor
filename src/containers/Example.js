import React from 'react'

import {BreadCrumbs, PageHeading} from 'template/layout'

export default class Example extends React.Component {
  render() {
    return(
          <div className="page-content">
            <BreadCrumbs childs={[
              {name: 'Dashboard', url: '/'},
              {name: 'Example page', last: true}
            ]}/>
            <PageHeading title="Example Page" />
              <div className="container-fluid">
                <div>
                  <div className="row">

                  <div className="col-md-6 col-md-offset-5">
                    <h2>Example Page</h2>
                  </div>

                  </div>
                </div>
              </div>
              </div>)
  }
}
