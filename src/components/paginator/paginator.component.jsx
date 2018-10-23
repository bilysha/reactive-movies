import React from 'react';

import './paginator.component.css';

export default class Paginator extends React.Component {

    componentWillMount() {
        this.updatePages();
    }

    updatePages() {
        let { activePage, pages } = this.props;

        if (pages < 10) {
            this.availablePages = new Array(pages - 2).fill(1).map((a, i) => i + 2);
            return ;
        }

        if (activePage < 5) {
            this.availablePages = new Array(4).fill(1).map((a, i) => i + 2)
            return ;
        }

        if (activePage > pages - 4) {
            this.availablePages = new Array(4).fill(1).map((a, i) => pages - 4 + i);
            return ;
        }

        this.availablePages = [activePage - 1, activePage, activePage + 1];
        return ;
    }


    render() {
        const { activePage, pages } = this.props;

        return (
            <section className='paginator'>
                <ul>
                    <li className={`${activePage === 1 ? 'active' : ''}`} onClick={() => this.props.switchToPage(1)}>1</li>
                    <li className={`dotted_li ${activePage > 4 ? '' : 'none'}`}>...</li>
                    {this.availablePages.map((page, index) =>
                        <li key={index} className={`${activePage === page ? 'active' : ''}` } onClick={() => this.props.switchToPage(page)}>{page}</li>
                    )}
                    <li className={`dotted_li ${activePage > pages - 4 ? 'none' : ''}`}>...</li>
                    <li className={`${activePage === pages ? 'active' : ''}`} onClick={() => this.props.switchToPage(pages)}>{pages}</li>
                </ul>
            </section>
        )
    }
}
